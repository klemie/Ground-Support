# Module

A Module is a component that displays real time data in a textfield

## Importing

```tsx
import Module from "../components/module" 
```
## Props
⚠️ All Props are required
```ts
interface ModuleProps {
    title: String,
    fields: Array<String>
    fieldValues: Array<Number>,
    fieldRanges: Array<Array<Number>>
}
```

>`title` ⭐ required

Name of the Module will appear in the header section

```tsx
<Module title="Module Title" />
```

>`fields` ⭐ required

Names of the fields in a list

```tsx
<Module 
    fields=[
        "FieldName1", 
        "FieldName2", 
        ...
    ] 
/>
```

>`fieldValues` ⭐ required

Data source of the field values. These values are dynamic so they should be wrapped in a useEffect

```tsx
import * as utils from '../utils';
import _ from "lodash";

const [moduleData, setModuleData] = useState([0, ...]) 
useEffect(() => {
    const previous = utils.usePrevious(moduleData);
    if(_.isEquals(previous, moduleData)) {
        setModuleData(moduleData);
    }
}, [moduleData]);

return(
    <Module fieldValues={moduleData}/>
)
```

⚠️ Since moduleData is a list the dependency Array won't check nested values therefore we have to check a previous version with the current version to check if there were changes

>`fieldRange` ⭐ required

Ranges that the fields operates in. These Values will determine what the status is. If any field value is out of range than the status will be failed

```tsx
<Module 
    fieldRanges=[
        [0, 14], 
        [0, 12], 
        ...
    ] 
/>
```

⚠️ `fieldRange.length == fields.length == fieldValues.length`