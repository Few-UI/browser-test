/* eslint-env es6 */

/**
 * Create tick to test async
 * @param {number} count tick count
 * @returns {Promise} promise
 */
export function printTick( count ) {
    let promises = [];
    for ( let i = 0; i < count; i++ ) {
        promises.push( new Promise( resolve => {
            setTimeout( () => {
                // lifecycleHook.push( `tick ${i + 1}` );
                resolve();
            } );
        } ) );
    }
    return Promise.all( promises );
}

/**
 * Test util for wait specific time
 * @param {number} millionseconds wait time in ms
 * @returns {Promise} promise with result
 */
export function wait( millionseconds ) {
    return new Promise( resolve => {
        setTimeout( () => {
            resolve( null );
        }, millionseconds );
    } );
}

/**
 * Parse view string as DOM with interpretion
 * @param {string} str HTML String snippet as input
 * @returns {Element} DOM Element
 */
export function parseViewToDiv( str ) {
    let newDom = document.createElement( 'div' );
    newDom.innerHTML = str.trim();
    return newDom;
}

/**
 * Parse view string as DOM without interpret it
 * TODO no for now and needs to be enahanced
 * @param {string} str view template as string
 * @returns {Element} DOM Element
 */
export function parseView( str ) {
    let parser = new DOMParser();
    let fragement = document.createDocumentFragment();
    fragement.appendChild( parser.parseFromString( `<div>${str}</div>`, 'text/html' ).body.firstChild );
    return fragement.firstChild;
}

