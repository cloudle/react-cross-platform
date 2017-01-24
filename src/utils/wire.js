import { AsyncStorage, Platform } from 'react-native';

const graphFetch = factory('http://localhost:4000/wire');

export function query(query, vars = {}, opts = {}) {

	return new Promise((resolve, reject) => {
		graphFetch(query, vars, opts).then(result => {
			if (result.errors) {
				reject(result.errors);
			} else {
				resolve(result.data);
			}
		}).catch(errors => { //Network or HTTP errors.
			console.warn("Outer error (Network/HTTP?):", errors);
		});
	});
}

if (Platform.OS == 'web') global.wire = {
	query: query,
};

function factory (graphqlUrl) {
	return async function graphqlFetch (query, vars = {}, opts = {}) {
		opts.body = JSON.stringify({
			query: query,
			variables: vars
		});

		// default opts
		opts = {
			method: 'POST',
			mode: 'cors',
			headers: new Headers(),
			...opts,
		};

		// default headers, and Authorization if possible (logged in).
		let headers = opts.headers, token = await AsyncStorage.getItem('sysConfigs');
		if (!headers.get('content-type')) opts.headers.append('content-type', 'application/json');
		if (token) opts.headers.append('Authorization', token);

		return fetch(graphqlUrl, opts).then(function (res) {
			return res.json();
		})
	}
}

export let Relay = {
	QL: (fragments, ...params): string => {
		let pureQuery = '', headingFragments = [], headingFragment = '';

		for (let i = 0; i < params.length; i++) {
			let nextFragment = gatherFragments(headingFragment, params[i]);
			// if (!nextFragment.name) throw "graph query's fragment error.";

			/*Only add a unique fragment to the heading once,
			 no need to re-insert it to the header - if it's already there */
			if (headingFragments.indexOf(nextFragment.name) < 0) {
				headingFragment = nextFragment.headings;
				headingFragments.push(nextFragment.name);
			}

			pureQuery += fragments[i] + `...${nextFragment.name}`;
		}

		//Insert Fragments heading to final query if possible and return!.
		if (headingFragments.length) pureQuery = headingFragment + pureQuery;
		return pureQuery + fragments[params.length];
	}
};

const fragmentRegEx = /[\t\n ]{0,}fragment[\n\t ]{1,}([\w]+)[\n\t ]{1,}on[\n\t ]{0,}([\w]+)[\n\t ]{0,}[{]{1}[\n\t\ ]+([\w\W]+)[\n\t ]+[}]{1}[\n\t ]{0,}/;
/* E.g for For above regEx -----------------
 fragment jobRequestFragment on JobRequest {
 id,
 name,
 complex {
 id
 age
 more
 }
 }
 * */

function gatherFragments(fragments, fragment) {
	let nextFragmentName, nextFragmentHeadings = fragments,
		results = fragmentRegEx.exec(fragment);

	/*If matched mutate [fragmentName], [fragmentQuery] & [nextFragments]
	 for the function's return */
	if (results) {
		//NOTE: results[2] is is the inside query, which not use for now;
		nextFragmentName = results[1];
		nextFragmentHeadings += fragment; //nextFragment header will include current fragment
	}

	return {
		headings: nextFragmentHeadings,
		name: nextFragmentName,
	}
}
