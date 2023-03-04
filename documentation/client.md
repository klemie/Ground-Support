# Client Documentation

## Design Patterns

Uses a MCV architecture.
Component based design.
## MUI

Material User Interface (MUI) is a react component library that builds off of the material design standard regulated by Google. All our styling is made in accordance with these standards. To make sure we follow these standards we will be refraining from creating our own styles as much as possible. This lessing the amount of work on our developers and generally following a proven styling standard.

When developing the frontend it is a good idea to have the MUI docs open [mui docs](https://mui.com/material-ui/getting-started/overview/)

You can import any component through `import ComponentName from "'@mui/material/{ComponentName}"` make sure to read all the props and seeing how you can customize them before altering there style.

### TypeScript

TODO: After MVP

refer to there docs there pretty good

### Styling

Only style when necessary component library should handle most of it.

However if custom styling is necessary we will be using SASS. Each component will have a separate styling sheet.
## Views

View are defined by the content inside of full view port. A view is meant to be modular they should only contain HTML code for layout and structure while components fill up the content. The file name is the same name as the component in the definition but is under

## Components

Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML. Components will be built as functional components as it is the status quo for most modern React applications.

## Component Life Cycle

For a react component there are three main phases

- Mounting
- Updating
- Unmounting

Similar to OOP these we must maintain these three states to make sure our components work properly and don't slow down our app or cause unwanted side effects.

Since we are using Functional components we will use React Hooks to deal with these different phases. Below you can see the different built in methods used in a react components life cycle.

<p align="center">
    <img src="./assets/react-component-life-cycle.jpg" width="600"/>
</p>

Mounting phase:
- New component is created and inserted into the DOM

Updating phase:
- Rerenders compute when new state is updated


Unmounting:
- Removed from the DOM



**Hooks**


Hooks allow you to access state from functional components, which is normally only possible in class based components

📝 `State` State is the dynamic data inside of a component. When state changes the component rerenders.


The 2 most important states are `useEffect` and `useState`. These two hooks allow you to replace all of the methods used in the life cycle in a class based design.

🪙 `useState`

This hook

🤝 `useEffect`

This hook allows you to create side effect while keeping the component pure. Similar to computed values in other frameworks use effect will update a certain value if and only if its array of dependencies are updated.


for more in-depth information on the life cycle you can read
[Life cylce methos and hooks explained](https://retool.com/blog/the-react-lifecycle-methods-and-hooks-explained/#:~:text=A%20React%20component%20undergoes%20three%20phases%20in%20its%20lifecycle%3A%20mounting,often%20called%20%E2%80%9Cinitial%20render.%E2%80%9D)

### How to add a Component

In the components folder add a new `tsx` file

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

## Flight Report
TODO: After MVP