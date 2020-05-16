
function wrap(){
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		console.log('Creating a wrapped function');
		let old_function = descriptor.value;
		descriptor.value = function (input: string) {
			console.log('A dummy output here');
			old_function.apply(this, [input]);
		};
		console.log('Returning wrapper');
		return descriptor;
	};
}

class Test {

	name_string(){
		return 'Tim';
	}

	another_level(){
		return 'Hello, ' + this.name_string();
	}

	// @ts-ignore
	@wrap()
	thing(something: string) {
		console.log(this.another_level());
	}

}

let test = new Test;
test.thing("Hello, World!");
