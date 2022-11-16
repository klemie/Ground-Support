# Client Documentation

## Design Patterns

Uses a MCV architecture.

Component based design. 
### Components

Components are designed

tsx files

```ts
interface {Name}ContextType {
    {Name}: {DefaultValue},
    set{Name}: (value: {ValueType}) => void;
};
```

```ts
type {Name}Props {
    {Param}: {ParamType},
};
```

```ts
const {Name}: React.FC<{Name}Props> = ({ {Param} }) => {
    return(
        <>
            {Body}
        </>
    );
};

export default {Name}
```

## MUI

Material User Interface (MUI) is a react component library that builds off of the material design standard regulated by Google. 

### TypeScript

```ts
const Type: Int;
```
### Sass

Only style when necessary component library should handle most of it.

## Components 

### Modules

###