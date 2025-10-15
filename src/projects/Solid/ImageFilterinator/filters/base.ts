export type FilterParam = {
    key: string;
    label: string;
    type: 'range' | 'checkbox' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
};

export abstract class BaseFilter {
    name: string;
    description: string;
    active: boolean;
    
    constructor(props: {name: string, description: string, active: boolean}) {
        this.name = props.name;
        this.description = props.description;
        this.active = props.active;
    }
    
    abstract process(props: {ctx: CanvasRenderingContext2D}): CanvasRenderingContext2D;
    
    // Override this in subclasses to define settings UI
    getParams(): FilterParam[] {
        return [];
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }
}