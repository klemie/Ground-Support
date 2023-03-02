# RocketProfilePopup

A popup form to setup parameters and import data for a new rocket profile specifying the
- Name
- Mass
- Height
- Class
- Motor Type
- Motor Name

## Importing

```tsx
import RocketProfilePopup from "../components/RocketProfilePopup";
```
## Props
```ts
interface RocketProfileProps {
  onClose: () => void;
}
```

>`onClose` ⭐ required

A function to close the dialog. 
```tsx
onClose={()=> setIsOpen(false)}
```


```tsx
//{usecase of component}
const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

<Button onClick={handleOpen}>Open modal</Button>
<Modal
  open={open}
  onClose={handleClose}
>
  <RocketProfilePopup onClose={handleClose}/>
</Modal>
```
