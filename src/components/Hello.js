import "./Hello.css";

const Hello = (props) => {
  return (
    <div className="f1 tc">
      <h1>Hello World</h1>
      <p className="white-50">{props.greeting}</p>
    </div>
  );
};

export default Hello;
