## usage

```tsx



function App() {
  const { addToast } = useToast();

  return (
    <button
      onClick={() =>
        addToast({
          // unix timestamp
          id: Date.now().toString(),
          title: "my title",
          type: "info",
          duration: 5000,
          children: toastChildren,
        })
      }
    >
      Add Toast
    </button>
  );
}
```
