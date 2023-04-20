# Mission Config

A pop-up dialog allowing the user to configure mission information.

## Importing

```tsx
import MissionConfig from "../components/MissionConfig" 
```
## Props
```tsx
interface MissionConfigProps {
    missionId?: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}
```

>`missionId` 
The id of the mission.


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

>`onSave` ⭐ required
A function to save the inputs. 
```tsx
onSave={()=> handleSave()}
```


```tsx
//{usecase of component}
const [isOpen, setIsOpen] = useState(false);

<MissionConfig isOpen={isOpen} onClose={()=>setIsOpen(false)} onSave={()=>handleSave()} />
```
