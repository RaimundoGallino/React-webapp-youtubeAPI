# Glitching image effect

A basic React component for a glitching image effect.

---

GlitchedImage takes a single image prop (`string`) and must be in a container with a set height or flex grow.

## To use:

```tsx
import { GlitchedImage } from 'react-image-glitch'

const MyComponent = () => {
  const myImageString = 'www.example.com/image'
  return (
    <div style={{ height: 500 }}>
      <GlitchedImage image={myImageString} />
    </div>
  )
}
```
