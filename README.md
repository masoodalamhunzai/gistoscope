# Gistoscope Frontend (React v17)

## Getting Started

> First make sure you have node and npm installed in your operating system

### Installing dependencies

> navigate to the project folder and type the following command

```bash
npm install
```

### setup Environment Variable

> create a **.env** file in the root of your project and add the following environment
> variable in it **REACT_APP_BASE_URL**, the value of this variable would the the api URL
> of your backend server.

### Starting Development

> Run the following command to start development server

```bash
npm start
```

## Bundling for Production

> Run the following command to build production optimized bundle of this project

```bash
npm run build
```

this would create a new **build** folder in your project directory.

# Project Architecture Key Points

[*] All The Re-usable components are placed in **src/components**

[*] All the tightly coupled components are place as siblings to the main file in
**src/pages**

[*] All the Api call logic is placed in **src/store/actions/\***

[*] Each **styles.css** file is responsible for custom styling of sibling components
