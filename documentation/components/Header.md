# Header

The header holds the app logo, name and breadcrumbs. 

## Importing

```tsx
import { Header } from "../components/Header";
```
## Props
```ts
interface HeaderProps {
    breadCrumbs: Breadcrumb[];
};
```

> `breadCrumbs` ⭐ required

An array of breadcrumbs. renders in the order of the array.

Each of the breadcrumbs come in this interface. 

```ts
interface breadCrumbs {
    name: string;
    path?: string;
    active: boolean;
};
```

Currently the path does nothing. 

## Use case

```tsx
import { Breadcrumb } from "../components/Header"; 

const crumbs: breadCrumbs[] = [
    { name: "New Mission", active: false },
    { name: "Standby", active: false }
];

return (
    <Header breadCrumbs={crumbs} />
);
```
<p align="center">
<img src="../assets/headerComponent.png" />
</p>
