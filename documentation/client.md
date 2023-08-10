# Client Documentation

## Design Patterns

Uses a MCV architecture.
Component based design.

## Dynamic UI
When designing Ground Support, much consideration was put towards the longevity and adaptability of the application. Not every rocket is guaranteed to use the same hardware and components. Hardcoding the software to match the needs of the rocket year to year introduces unnecessary work, increases the risk of errors and lessens any incentive to use the application. To avoid this, we designed the application to have a dynamic UI. This is most present in the module configuration. Modules require a DataConfig that the user creates and the UI dynamically updates to reflect the structure of the DataConfig. As a result, less updates to the code are needed, the application accommodates a wide variety of hardware, the modules are easily configurable and its ease of use lessens the barrier of entry for any new users.

<p align="center">
    <img src="./assets/data-config-to-module.png" width="600"/>
</p>
A DataConfig is a JSON file that is used to interface with the app and communicate different configurations for different rockets. This file will generate what the modules will look like in the app. Telemetry data coming into the app must have exactly the same fields as specified on the data config.

## MUI

Material User Interface (MUI) is a react component library that builds off of the material design standard regulated by Google. All our styling is made in accordance with these standards. To make sure we follow these standards we will be refraining from creating our own styles as much as possible. This lessing the amount of work on our developers and generally following a proven styling standard.

When developing the frontend it is a good idea to have the MUI docs open [mui docs](https://mui.com/material-ui/getting-started/overview/)

You can import any component through `import ComponentName from "'@mui/material/{ComponentName}"` make sure to read all the props and seeing how you can customize them before altering there style.

### TypeScript

TODO: After MVP

refer to there docs there pretty good

### Styling

Only style when necessary component library should handle most of it.


Global Theming is done in `src/theme.tsx`. This is provided by MUI and allows us to change the theme of the app. This is where we will be changing the color scheme of the app. The theme is then passed down to the `ThemeProvider` which is a wrapper around the app. This allows us to use the theme in any component. To use the theme in a component you can use the `useTheme` hook. This will give you access to the theme object. You can then use the theme object to style your component. For more information on how to use the theme object refer to the [MUI docs](https://mui.com/customization/theming/)



## Views

View are defined by the content inside of full view port. A view is meant to be modular they should only contain code for layout, state and structure while components fill up the content. The file name is the same name as the component in the definition but is under kebab-case, which is the general convention for HTML files.

## Components

Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML. Components will be built as functional components as it is the status quo for most modern React applications. Components will be defined in the `components` folder. The file name is defined using PascalCase, which is the general convention for Txs component files.

## Component Life Cycle

For a react component there are three main phases:

- Mounting
- Updating
- Unmounting

Similar to OOP these we must maintain these three states to make sure our components work properly and don't slow down our app or cause unwanted side effects.

Since we are using Functional components we will use React Hooks to deal with these different phases. Below you can see the different built in methods used in a react components life cycle.

<p align="center">
    <img src="./assets/react-component-life-cycle.jpg" width="600"/>
</p>

Mounting phase:
- New component is created and inserted into the DOM.

Updating phase:
- Rerenders compute when new state is updated.

Unmounting:
- Removed from the DOM tree.



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