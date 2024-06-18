#### React Components

- **React Components**: Components are the building blocks of a React application. They encapsulate pieces of the UI and can be reused throughout the application.

#### Difference Between Class-based and Function-based Components

- **Class-based Components**: These are ES6 classes that extend `React.Component` and must include a `render` method to return JSX.
  ```jsx
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

- **Function-based Components**: These are simpler components defined as functions. They can now use hooks (e.g., `useState`, `useEffect`) to handle state and lifecycle methods.
  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

#### Why Function-based Components?

- **Introduction of Hooks**: Function-based components were enhanced with hooks to handle state and side effects, making them more powerful and easier to understand.
- **Benefits**: They lead to less boilerplate code, better readability, and easier testing. Function-based components always start with a capital letter to differentiate them from regular HTML elements.

#### Different Ways of Writing Functional Components

- **Arrow Functions**:
  ```jsx
  const Welcome = (props) => {
    return <h1>Hello, {props.name}</h1>;
  };
  ```

- **Traditional Function Syntax**:
  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

#### Component Composition

- **Using `<Component />`**:
  ```jsx
  function App() {
    return (
      <div>
        <Welcome name="Alice" />
        <Welcome name="Bob" />
      </div>
    );
  }
  ```

- **Using `{ Component() }`**:
  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }

  function App() {
    return (
      <div>
        {Welcome({ name: 'Alice' })}
        {Welcome({ name: 'Bob' })}
      </div>
    );
  }
  ```

#### Writing JavaScript Inside Components

- **Using JavaScript Expressions**:
  ```jsx
  function Greeting() {
    const user = { firstName: 'John', lastName: 'Doe' };
    return <h1>Hello, {`${user.firstName} ${user.lastName}`}!</h1>;
  }
  ```

- **Using React Elements Inside Components**:
  ```jsx
  function App() {
    const element = <h1>Hello, React!</h1>;
    return (
      <div>
        {element}
        <p>This is a React element inside a component.</p>
      </div>
    );
  }
  ```

#### How JSX Prevents Cross-Site Scripting (XSS) Attacks

- **XSS Prevention**: JSX automatically escapes any values embedded within it. This means that any content injected into JSX is converted to a string and rendered as text, preventing the execution of malicious scripts.

**Example**:
```jsx
const userInput = '<img src="x" onerror="alert(\'XSS\')" />';
const element = <div>{userInput}</div>;
// This will render the raw string without executing the script
```