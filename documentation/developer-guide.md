# Developer Guide

## Installation

Please see the [installation guide](installation.md#developer-installation) for a guide on how to install the project.
## Resources
- [Git Tutorial](https://www.figma.com/proto/LAxam3HVit5yoHmCxu2xa2/Git?page-id=0%3A1&type=design&node-id=1-796&viewport=554%2C653%2C0.24&t=YB0SXZsT8TWyvT93-1&scaling=min-zoom&starting-point-node-id=1%3A19&mode=design) - UVic Rocketry Git reference guide
- [Software Process](https://docs.google.com/presentation/d/1gkJjfWnc6jsr0PQ29cYPVdIOYFZum4SubFt4X8ovL-o/edit#slide=id.g146cc2337ed_0_4) - UVic Rocketry Software Process guidelines
## Standards

### Code Style

`⚠️ 4 tab indentation ⚠️` Please change your IDE setting to match or I will hunt you down.

#### Naming Typescript
- Use `PascalCase` for component file names 
- Use `kebab-case` for view file names
- Use `camelCase` for all variable names
- Use `PascalCase` for all interface names
- Use `UPPER_CASE` for all constants

#### Naming Python
- Use `snake_case` for all variable names
- Use `PascalCase` for all class names
- Use `UPPER_CASE` for all constants

#### Comments
Use minimal commenting. If you need to comment your code either your code is too complex or is not readable. Comment is only needed for complex algorithms or for code that is not self explanatory. 

- Use `//` for single line comments and `/* */` for multi line comments.

#### Imports

- Use `import React from 'react'` for importing React
- Use `import { useState } from 'react'` for importing hooks
- Use `import { IProps } from './component'` for importing interfaces
- Use `import { useSocketContext } from '../context/socket'` for importing custom hooks

#### Typescript Interfaces
All interface names should be `PascalCase` with an `I` at the start of the name. For example `IProps` or `IUser`.

#### Github

- Use `kebab-case` for all branch names

Pull requests should have a title that is descriptive of the changes made. The description should be a list of changes made and a brief explanation of why the changes were made.

## Frontend Development


### How to Make a Component
Create a new file in the `components` folder with the name of the component in PascalCase. The file is named in `PascalCase` and the extension should be `.tsx` as we are using TypeScript. Use the following template to create a component:

```tsx
import React, { useEffect } from 'react';

interface IProps {
  // props
}

const Component: React.FC<IProps> = (props: IProps) => {
    // state
    const [data, setData] = useState<any>(null);
    // or 
    const useSocketContext = () => useContext<SocketContext>(Context);

    // effects
    useEffect(() => {
        // Perform any initializations or side effects here
        // This will only run once when the component is mounted
        return () => {
            // Perform any cleanup here
            // This will only run once when the component is unmounted
        };

    }, []);

    // render
    return (
        <>
        
        </>
    );
};

export default Component;
```
There should be an accompanying documentation file in the `documentation/components` folder with the same name as the component. This file should contain a description of the component and how to use it. Use this template: [Example Component Document](./components/exampleComponentDocumentation.md).
### How to Make a View

### How to access the API



## Server Backend 

### How to create an Entity
```tsx

```

## Telemetry Backend