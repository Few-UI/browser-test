/* eslint-env es6 */

/**
 * Converts an object to HTML string representation of attributes.
 *
 * For example: `{ foo: "bar", baz: "foo" }`
 * becomes `foo="bar" baz="foo"`
 *
 * @param {object} attributes attributes
 * @returns {string} string as HTML attributes
 */
function _mapObjectToHTMLAttributes( attributes ) {
    return Object.entries( attributes ).reduce( ( previous, current ) => {
        return previous + ` ${current[0]}="${current[1]}"`;
    }, '' );
}


/**
 * Replaces document's body with provided element
 * including given attributes.
 * @param {string} tag tags
 * @param {object} attributes attributes[]
 * @param {string} textContent attributes[]
 */
function _renderToDocument( tag, attributes, textContent ) {
    const htmlAttributes = _mapObjectToHTMLAttributes( attributes );
    document.body.innerHTML = `<${tag} ${htmlAttributes}>${ textContent ? textContent : '' }</${tag}>`;
}

/**
 * Returns a promise which resolves as soon as
 * requested element becomes available.
 * @param {string} tag HTML tag
 * @param {boolean} waitForSubDiv if true will wait until firstchild is ready
 * @returns {Promise<HTMLElement>} promise object
 */
async function _waitForComponentToRender( tag, waitForSubDiv ) {
    return new Promise( resolve => {
        /**
         * test function
         */
        function requestComponent() {
            const element = document.querySelector( tag );
            if ( waitForSubDiv ? element && element.firstChild : element ) {
                resolve( element );
            } else {
                window.requestAnimationFrame( requestComponent );
            }
        }
        requestComponent();
    } );
}

/**
 * Renders a given element with provided attributes
 * and returns a promise which resolves as soon as
 * rendered element becomes available.
 * @param {string} tag tags
 * @param {object} attributes attributes
 * @param {string} textContent attributes[]
 * @returns {Promise<HTMLElement>} Promise Object
 */
export function render( tag, attributes = {}, textContent = '' ) {
    _renderToDocument( tag, attributes, textContent );
    return _waitForComponentToRender( tag );
}

/**
 * Renders a given element with provided attributes
 * and returns a promise which resolves as soon as
 * rendered element becomes available.
 * @param {string} tag tags
 * @param {object} attributes attributes
 * @param {string} textContent attributes[]
 * @returns {Promise<HTMLElement>} Promise Object
 */
export function renderToSub( tag, attributes = {}, textContent = '' ) {
    _renderToDocument( tag, attributes, textContent );
    return _waitForComponentToRender( tag, true );
}

/**
 * Create tick to test async
 * @param {number} count tick count
 * @returns {Promise} promise
 */
export function printTick( count ) {
    let promises = [];
    for ( let i = 0; i < count; i++ ) {
        promises.push( new Promise( ( resolve, reject ) => {
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
    return new Promise( ( resolve, reject ) => {
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

