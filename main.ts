
// @ts-ignore
import {jag} from "./jag.ts"


class Bar extends jag.Obj {
	// @ts-ignore
	@jag.fn()
	name_string(){
		return 'Tim'
	}

}


class Baz extends jag.Obj {
	@jag.fn()
	name_string(){
		return 'Adele';
	}
}


class Foo extends jag.Obj {
	// @ts-ignore
	@jag.fn()
	test_fun(){
		return 'Hello';
	}

	// @ts-ignore
	@jag.fn()
	name_class(){
		return Bar;
	}

	@jag.fn()
	name_obj(){
		return jag.new(this.name_class());
	}

	// @ts-ignore
	@jag.fn()
	name_string(){
		return this.name_obj().name_string();
	}

	// @ts-ignore
	@jag.fn()
	another_level(){
		return 'Hello, ' + this.name_string();
	}

	// @ts-ignore
	@jag.fn()
	thing() {
		console.log(this.another_level());
	}

}

let test = new Foo;

test.thing();
jag.set_value(test.name_class, Baz);
test.thing();
jag.set_value(test.name_class, jag.NO_VALUE);
test.thing();
