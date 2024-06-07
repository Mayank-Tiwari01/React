1. **React Components**:
   - Fundamental building blocks of a React application.
   - Can be class-based or functional.

2. **Difference Between Class-Based and Function-Based Components**:
   - **Class-Based Components**:
     - Stateful components.
     - Use lifecycle methods (e.g., `componentDidMount`, `componentDidUpdate`).
     - Example:
       ```jsx
       class MyComponent extends React.Component {
         render() {
           return <div>Hello, World!</div>;
         }
       }
       ```
   - **Function-Based Components**:
     - Stateless components (can use hooks to manage state).
     - Simpler and more concise.
     - Example:
       ```jsx
       function MyComponent() {
         return <div>Hello, World!</div>;
       }
       ```

3. **Why Functional Components Were Introduced and Why They Are Better**:
   - Simplified syntax and easier to read.
   - Use hooks for state and side effects, promoting functional programming.
   - Performance benefits due to less overhead than class-based components.
   - Always start with a capital letter to distinguish them from regular HTML tags.

4. **Different Ways of Writing Functional Components**:
   - Using regular function:
     ```jsx
     function MyComponent() {
       return <div>Hello, World!</div>;
     }
     ```
   - Using arrow function:
     ```jsx
     const MyComponent = () => {
       return <div>Hello, World!</div>;
     }
     ```

5. **Functional Component Composition**:
   - Combining multiple components to build complex UIs.
   - Using component tags:
     ```jsx
     function App() {
       return (
         <div>
           <Header />
           <MainContent />
           <Footer />
         </div>
       );
     }
     ```
   - Using component functions directly:
     ```jsx
     function Header() {
       return <h1>Header</h1>;
     }
     
     function App() {
       return (
         <div>
           {Header()}
           <MainContent />
           <Footer />
         </div>
       );
     }
     ```

6. **Writing JavaScript Inside Components and React Elements**:
   - Embedding JavaScript expressions within JSX using curly braces `{}`.
   - Example:
     ```jsx
     function MyComponent() {
       const name = "World";
       return <div>Hello, {name}!</div>;
     }
     ```
   - Using React elements inside a component:
     ```jsx
     function MyComponent() {
       const element = <h1>Hello, World!</h1>;
       return <div>{element}</div>;
     }
     ```

7. **How JSX Prevents Cross-Site Scripting (XSS) Attacks**:
   - JSX escapes any values embedded within `{}` before rendering them.
   - This means that JSX automatically escapes special characters to prevent code injection.
   - Example:
     ```jsx
     function MyComponent() {
       const userInput = "<img src='x' onerror='alert(1)'>";
       return <div>{userInput}</div>; // renders as plain text, not HTML
     }
     ```
   - Ensures that all user inputs are rendered as text, not executable code, mitigating XSS attacks.

### Modern Way of Writing React Code

Given the context of modern React development, here is an example of using a functional component with JSX:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";

const SubHeading = () => <h2>Welcome to learning React</h2>;

const Paragraph = () => <p>React is a JavaScript library for building user interfaces.</p>;

const Container = () => (
  <div className="container">
    <SubHeading />
    <Paragraph />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Container />);
```

### Explanation

1. **SubHeading Component**:
   - Functional component defined using an arrow function.
   - Returns an `<h2>` element.

2. **Paragraph Component**:
   - Functional component defined using an arrow function.
   - Returns a `<p>` element.

3. **Container Component**:
   - Functional component that composes `SubHeading` and `Paragraph` components.
   - Uses JSX syntax for embedding these components.

4. **Rendering the Container Component**:
   - Uses `ReactDOM.createRoot` to get the root element.
   - Renders the `Container` component inside the root element.