# Event Emitter

A lightweight, flexible event emitter utility for JavaScript applications. Provides a clean API for managing event listeners and triggering events with error handling.

## Features

- ✨ **Simple API** - Easy to use event binding and triggering
- 🔧 **Zero dependencies** - Pure JavaScript implementation
- ⚡ **Lightweight** - Minimal footprint
- 🛡️ **Error handling** - Built-in error catching for event listeners
- 🔄 **Method chaining** - Fluent interface for easy composition
- 📦 **Multiple formats** - ESM, CommonJS, and UMD builds

## Installation

```bash
npm install @magic-spells/event-emitter
```

```javascript
// ES modules
import EventEmitter from '@magic-spells/event-emitter';

// CommonJS
const EventEmitter = require('@magic-spells/event-emitter');
```

Or include directly in your HTML:

```html
<script src="https://unpkg.com/@magic-spells/event-emitter"></script>
```

## Usage

### Basic Example

```javascript
import EventEmitter from '@magic-spells/event-emitter';

const emitter = new EventEmitter();

// Bind an event listener
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Trigger the event
emitter.emit('greet', 'World'); // Output: "Hello, World!"
```

### Method Chaining

```javascript
const emitter = new EventEmitter()
  .on('start', () => console.log('Starting...'))
  .on('progress', (percent) => console.log(`Progress: ${percent}%`))
  .on('complete', () => console.log('Done!'));

emitter.emit('start');
emitter.emit('progress', 50);
emitter.emit('complete');
```

### Multiple Listeners

```javascript
const emitter = new EventEmitter();

emitter.on('data', (data) => console.log('Handler 1:', data));
emitter.on('data', (data) => console.log('Handler 2:', data));

emitter.emit('data', 'Hello'); 
// Output:
// Handler 1: Hello
// Handler 2: Hello
```

## API

### Methods

#### `on(event, listener)`

Binds a listener function to an event.

- `event` (string): The event name
- `listener` (function): The listener function to bind
- Returns: `EventEmitter` instance for chaining
- Throws: `TypeError` if listener is not a function

```javascript
emitter.on('test', (data) => {
  console.log('Received:', data);
});
```

#### `off(event, listener)`

Unbinds a specific listener from an event.

- `event` (string): The event name
- `listener` (function): The listener function to unbind
- Returns: `EventEmitter` instance for chaining

```javascript
const handler = (data) => console.log(data);
emitter.on('test', handler);
emitter.off('test', handler); // Removes the specific handler
```

#### `emit(event, ...args)`

Triggers an event and calls all bound listeners.

- `event` (string): The event name to trigger
- `...args`: Arguments to pass to listener functions
- Returns: `boolean` - `true` if event had listeners, `false` otherwise

```javascript
const hasListeners = emitter.emit('test', 'data1', 'data2');
console.log(hasListeners); // true if listeners were called
```

#### `removeAllListeners(event?)`

Removes all listeners for a specific event or all events.

- `event` (string, optional): The event to remove listeners from. If not provided, removes all listeners for all events.
- Returns: `EventEmitter` instance for chaining

```javascript
// Remove all listeners for 'test' event
emitter.removeAllListeners('test');

// Remove all listeners for all events
emitter.removeAllListeners();
```

## Error Handling

The event emitter includes built-in error handling. If a listener throws an error, it will be caught and logged to the console without affecting other listeners:

```javascript
emitter.on('test', () => {
  throw new Error('Something went wrong!');
});

emitter.on('test', () => {
  console.log('This will still run');
});

emitter.emit('test');
// Output: Error in listener for event 'test': Error: Something went wrong!
// Output: This will still run
```

## Examples

### Class Integration

```javascript
import EventEmitter from '@magic-spells/event-emitter';

class DataProcessor extends EventEmitter {
  constructor() {
    super();
  }
  
  process(data) {
    this.emit('start', data);
    
    // Simulate processing
    setTimeout(() => {
      const result = data.toUpperCase();
      this.emit('complete', result);
    }, 1000);
  }
}

const processor = new DataProcessor();
processor.on('start', (data) => console.log('Processing:', data));
processor.on('complete', (result) => console.log('Result:', result));

processor.process('hello world');
```

### Event Namespacing

```javascript
const emitter = new EventEmitter();

// Use namespaced events
emitter.on('user:login', (user) => console.log('User logged in:', user.name));
emitter.on('user:logout', (user) => console.log('User logged out:', user.name));
emitter.on('data:received', (data) => console.log('Data received:', data));

emitter.emit('user:login', { name: 'John' });
emitter.emit('data:received', { items: [1, 2, 3] });
```

### Cleanup Pattern

```javascript
class Component {
  constructor() {
    this.emitter = new EventEmitter();
    this.boundHandler = this.handleData.bind(this);
    
    // Bind event
    this.emitter.on('data', this.boundHandler);
  }
  
  handleData(data) {
    console.log('Handling:', data);
  }
  
  destroy() {
    // Clean up listeners
    this.emitter.off('data', this.boundHandler);
    // or remove all listeners
    this.emitter.removeAllListeners();
  }
}
```

## Browser Support

- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+
- Node.js 12+

All modern browsers and Node.js environments with ES6 support.

## License

MIT