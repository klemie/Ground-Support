# Mission Config

A pop-up dialog allowing the user to configure mission information.

## Importing

```tsx
import MissionConfig from "../components/MissionConfig" 
```
## Props
```tsx
interface MissionConfigProps {
    missionName: string;
    location: [number, number];
    date: Date;
    rocketProfile: string;
    isOpen: boolean;
    onClose: () => void
}
```

>`missionName` ⭐ required

The mission name.

>`location` ⭐ required

Coordinates of the launch site.

>`date` ⭐ required

Date of the launch.

>`rocketProfile` ⭐ required

The rocket profile associated with the mission.

>`isOpen` ⭐ required

Whether the dialog is opened or not. Needs to be handled from the view.
```tsx
const [isOpen, setIsOpen] = useState(false);
```

>`onClose` ⭐ required

A function to close the dialog. 
```tsx
onClose={()=> setIsOpen(false)}
```


```tsx
//{usecase of component}
const [isOpen, setIsOpen] = useState(false);

<MissionConfig  missionName="Name" location={[0.000, 0.000]} date={new Date()} rocketProfile="Rocket" isOpen={isOpen} onClose={()=>setIsOpen(false)} />
```
