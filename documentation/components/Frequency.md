# Frequency

Frequency is the component that allows user to update the frequency for the telemetry view.

## Importing

```tsx
import Frequency from "../components/Frequency";
```

## Props
```ts
interface FrequencyProps {
  value: Number;
  updateFrequency: Function;
}
```

>`value` ⭐ required

Is the starting frequency value for the telemetry view. Since the value is dynamic, it should be wrapped in a useEffect.

```tsx
import React, { useEffect, useState } from "react";
const [frequency, setFrequency] = useState<Number>(100);

useEffect(() => {
    ...
}, [frequency]);

return (
    <Frequency value={frequency}/>
);
```

>`updateFrequency` ⭐ required

Is the function that allows parent component (telemetry-view) to receive changes made by the children component (Frequency).

```tsx
const [frequency, setFrequency] = useState<Number>(100);

function updateFrequency(newValue: Number) {
    setFrequency(newValue);
}

return (
    <Frequency updateFrequency={updateFrequency}/>
);
```
