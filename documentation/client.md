# Client Documentation

## Design Patterns

Uses a MCV architecture.
Component based design. 
## MUI

Material User Interface (MUI) is a react component library that builds off of the material design standard regulated by Google. All our styling is made in accordance with these standards. To make sure we follow these standards we will be refraining from creating our own styles as much as possible. This lessing the amount of work on our developers and generally following a proven styling standard.

When developing the frontend it is a good idea to have the MUI docs open [mui docs](https://mui.com/material-ui/getting-started/overview/)

You can import any component through `import ComponentName from "'@mui/material/{ComponentName}"` make sure to read all the props and seeing how you can customize them before altering there style.

### TypeScript

```ts
const Type: Int;
```
idk man look up a guide its not that crazy

### Styling

Only style when necessary component library should handle most of it.

However if custom styling is necessary we will be using SASS. Each component will have a separate styling sheet.
## Views

View are defined by the content inside of full view port. A view is meant to be modular they should only contain HTML code for layout and structure while components fill up the content. 

## Components 

Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.

### How to add a Component

`TSX` files

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

**State Management**
