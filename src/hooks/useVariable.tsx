import { useRef } from "react";

const useVariable = <Type, >(value: Type): [Function, Function] => {
    const ref = useRef(value);

    const get = () : Type => {
        return ref.current;
    }

    const set = (value: Type): void => {
        ref.current = value;
    }

    return [get, set];
}

export default useVariable;