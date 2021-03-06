/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var path = require( 'path' );
var tape = require( 'tape' );
var objectKeys = require( '@stdlib/utils-keys' );
var isObject = require( '@stdlib/assert-is-plain-object' );
var IS_WINDOWS = require( '@stdlib/assert-is-windows' );
var convertPath = require( '@stdlib/utils-convert-path' );
var manifest = require( './../lib' );


// FIXTURES //

var fixture = path.join( __dirname, 'fixtures', 'manifest.json' );
var extraFields = path.join( __dirname, 'fixtures', 'extra_fields.json' );
var extraFieldsAndDeps = path.join( __dirname, 'fixtures', 'extra_fields_and_deps.json' );
var badDependency = path.join( __dirname, 'fixtures', 'bad_dependency.json' );
var dependency = path.join( __dirname, 'fixtures', 'dependency.json' );
var relativePaths = path.join( __dirname, 'fixtures', 'relative_paths.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof manifest, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if provided a first argument which is not a string (no options)', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( value, {} );
		};
	}
});

tape( 'the function throws an error if provided a first argument which is not a string (options)', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( value, {}, {} );
		};
	}
});

tape( 'the function throws an error if provided a second argument which is not an object (no options)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( fixture, value );
		};
	}
});

tape( 'the function throws an error if provided a second argument which is not an object (options)', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( fixture, value, {} );
		};
	}
});

tape( 'the function throws an error if provided an options argument which is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[]
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( fixture, {}, value );
		};
	}
});

tape( 'the function throws an error if provided an invalid option', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		void 0,
		function noop() {},
		[],
		{}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			manifest( fixture, {}, {
				'basedir': value
			});
		};
	}
});

tape( 'the function throws if unable to read a manifest file', function test( t ) {
	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		manifest( 'dkjafljdafjdf.ajldjfasjfljs', {} );
	}
});

tape( 'the function throws if unable to resolve a manifest for a stated dependency', function test( t ) {
	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		var conditions;
		var opts;

		conditions = {
			'os': 'mac'
		};
		opts = {
			'basedir': __dirname
		};
		manifest( badDependency, conditions, opts );
	}
});

tape( 'the function returns an object if able to resolve a configuration', function test( t ) {
	var conditions;
	var expected;
	var conf;
	var opts;

	expected = {
		'os': 'mac',
		'src': [
			path.join( __dirname, 'fixtures', 'src', 'foo_mac.f' ),
			path.join( __dirname, 'fixtures', 'src', 'foo_mac_f.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': []
	};

	conditions = {
		'os': 'mac'
	};
	opts = {
		'basedir': __dirname
	};
	conf = manifest( fixture, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function returns an empty object if unable to resolve a configuration (no matching value)', function test( t ) {
	var conditions;
	var opts;
	var conf;

	conditions = {
		'os': 'beep-boop-bop-foo-bar'
	};
	opts = {
		'basedir': __dirname
	};
	conf = manifest( fixture, conditions, opts );
	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length, 0, 'returns an empty object' );
	t.end();
});

tape( 'if provided conditions without matching fields, the function returns a configuration based on default values', function test( t ) {
	var conditions;
	var expected;
	var opts;
	var conf;

	expected = {
		'os': 'linux',
		'src': [
			path.join( __dirname, 'fixtures', 'src', 'foo_linux.f' ),
			path.join( __dirname, 'fixtures', 'src', 'foo_linux.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': []
	};

	conditions = {
		'bar': 'foo'
	};
	opts = {
		'basedir': __dirname
	};
	conf = manifest( fixture, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports processing manifests which specify additional fields', function test( t ) {
	var conditions;
	var expected;
	var conf;
	var opts;

	expected = {
		'os': 'win',
		'src': [
			path.join( __dirname, 'fixtures', 'src', 'foo_win.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': [],
		'foo': 'bat'
	};

	conditions = {
		'os': 'win'
	};
	opts = {
		'basedir': __dirname
	};
	conf = manifest( extraFields, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports resolving dependencies', function test( t ) {
	var conditions;
	var expected;
	var conf;
	var opts;

	expected = {
		'os': 'linux',
		'src': [
			path.join( __dirname, 'fixtures', 'src', 'foo_linux.f' ),
			path.join( __dirname, 'fixtures', 'src', 'foo_linux.c' ),
			path.join( __dirname, 'fixtures', 'beep', 'src', 'foo_linux.f' ),
			path.join( __dirname, 'fixtures', 'beep', 'src', 'foo_linux.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' ),
			path.join( __dirname, 'fixtures', 'beep', 'include' )
		],
		'libraries': [
			'-lblas'
		],
		'libpath': [
			path.resolve( '/usr/local' )
		],
		'dependencies': [
			'./beep'
		]
	};

	conditions = {
		'os': 'linux'
	};
	opts = {
		'basedir': path.join( __dirname, 'fixtures' )
	};
	conf = manifest( dependency, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports resolving dependencies and generating relative paths', function test( t ) {
	var conditions;
	var expected;
	var conf;
	var opts;

	expected = {
		'os': 'linux',
		'src': [
			path.join( 'src', 'foo_linux.f' ),
			path.join( 'src', 'foo_linux.c' ),
			path.join( 'beep', 'src', 'foo_linux.f' ),
			path.join( 'beep', 'src', 'foo_linux.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' ),
			path.join( __dirname, 'fixtures', 'beep', 'include' )
		],
		'libraries': [
			'-lblas'
		],
		'libpath': [
			path.resolve( '/usr/local' )
		],
		'dependencies': [
			'./beep'
		]
	};

	conditions = {
		'os': 'linux'
	};
	opts = {
		'basedir': path.join( __dirname, 'fixtures' )
	};
	conf = manifest( relativePaths, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports processing manifests which specify additional fields (dependencies)', function test( t ) {
	var conditions;
	var expected;
	var conf;
	var opts;

	expected = {
		'os': 'win',
		'src': [
			path.join( __dirname, 'fixtures', 'src', 'foo_win.c' ),
			path.join( __dirname, 'fixtures', 'beep', 'src', 'foo_win.c' )
		],
		'include': [
			path.join( __dirname, 'fixtures', 'include' ),
			path.join( __dirname, 'fixtures', 'beep', 'include' )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': [
			'./beep'
		],
		'foo': 'bat'
	};

	conditions = {
		'os': 'win'
	};
	opts = {
		'basedir': path.join( __dirname, 'fixtures' )
	};
	conf = manifest( extraFieldsAndDeps, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports specifying a path convention', function test( t ) {
	var conditions;
	var expected;
	var paths;
	var conf;
	var opts;

	if ( IS_WINDOWS ) {
		paths = 'posix';
	} else {
		paths = 'win32';
	}
	expected = {
		'os': 'mac',
		'src': [
			convertPath( path.join( __dirname, 'fixtures', 'src', 'foo_mac.f' ), paths ),
			convertPath( path.join( __dirname, 'fixtures', 'src', 'foo_mac_f.c' ), paths )
		],
		'include': [
			convertPath( path.join( __dirname, 'fixtures', 'include' ), paths )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': []
	};

	conditions = {
		'os': 'mac'
	};
	opts = {
		'basedir': __dirname,
		'paths': paths
	};
	conf = manifest( fixture, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});

tape( 'the function supports specifying a path convention (extra fields)', function test( t ) {
	var conditions;
	var expected;
	var paths;
	var conf;
	var opts;

	if ( IS_WINDOWS ) {
		paths = 'posix';
	} else {
		paths = 'win32';
	}
	expected = {
		'os': 'mac',
		'src': [
			convertPath( path.join( __dirname, 'fixtures', 'src', 'foo_mac.f' ), paths ),
			convertPath( path.join( __dirname, 'fixtures', 'src', 'foo_mac_f.c' ), paths )
		],
		'include': [
			convertPath( path.join( __dirname, 'fixtures', 'include' ), paths )
		],
		'libraries': [],
		'libpath': [],
		'dependencies': [],
		'foo': 'baz'
	};

	conditions = {
		'os': 'mac'
	};
	opts = {
		'basedir': __dirname,
		'paths': paths
	};
	conf = manifest( extraFields, conditions, opts );

	t.strictEqual( isObject( conf ), true, 'returns an object' );
	t.strictEqual( objectKeys( conf ).length > 0, true, 'returns a non-empty object' );
	t.deepEqual( conf, expected, 'returns expected configuration' );

	t.end();
});
