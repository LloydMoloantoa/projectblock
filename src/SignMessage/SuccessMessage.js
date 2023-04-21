export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div >
      <div>
        <h3>{message}</h3>
      </div>
    </div>
  );
}
