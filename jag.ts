
interface JagNodeInterface {
    (): any;
    set_value(return_value: any): void;
    override(return_value: any): void;
    invalidate(): void;
}


interface FunctionInterface {
    (args: any): any
}


class JagNode{

    private readonly old_function: FunctionInterface;
    private readonly target: object;
    private flags: number;

    private constructor(target: object, old_function: FunctionInterface, private return_value = undefined) {
        this.old_function = old_function;
        this.target = target;
        this.flags = 0x00;
    }

    public call(args: any): any {
        if (this.flags == 0x01){
            return this.return_value;
        }
        return this.old_function.apply(this.target, args);
    }

    public override(return_value: any): void {
        if (return_value == jag.NO_VALUE) {
            this.flags = 0x00;
        } else {
            this.flags = 0x01;
            this.return_value = return_value;
        }
    }

    public set_value(return_value: any): void{
        if (return_value == jag.NO_VALUE) {
            this.flags = 0x00;
        } else {
            this.flags = 0x01;
            this.return_value = return_value;
        }
    }

    public static create(target: object, old_function: FunctionInterface): JagNodeInterface {
        const instance = new JagNode(target, old_function);
        return (<any>Object).assign(
            (args: any) => instance.call(args),
            {
                set_value: (return_value: any): void => instance.set_value(return_value),
                override: (return_value: any): void => instance.override(return_value)
            }
        );
    }
}


class JagObject {
    /* Add any common functions in here */
}


class jag {

    public static readonly can_set = 0x02;
    public static readonly NO_VALUE = 0x00;
    public static readonly Obj = JagObject;
    public static cache = {};

    static set_value(node: any, return_value: any){
        node.set_value(return_value);
    }

    static fn(flags: number = 0x00) {
        function wrapping_function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let old_function = descriptor.value;
            descriptor.value = JagNode.create(target, old_function);
        }
        return wrapping_function;
    }

    static new(class_type: any) {
        return new class_type;
    }

}

export {jag}
