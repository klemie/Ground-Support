# Settings Dialog

A pop-up dialog prompting the user to set a mission name and upload a DataConfig file.

## Importing

```tsx
import SettingsDialog from "../components/SettingsDialog" 
```
## Props
```tsx
interface SettingsDialogProps {
    isOpen: boolean;
    onClose: () => void
}
```

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

<SettingsDialog missionName="Mission Name" isOpen={isOpen} onClose={()=> setIsOpen(false)} />
```
