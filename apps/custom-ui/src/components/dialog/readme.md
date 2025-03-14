## usage
```tsx

function App() {
  const { openDialog } = useDialog();

  return (
    <>
      <button
        onClick={() => {
          openDialog({ content: <div>Dialog Content</div> });
        }}
      >
        open a dialog
      </button>
    </>
  );
}

```