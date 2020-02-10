# Install

```sh
npm install -g parcel-bundler
npm install
```

# Run

```sh
parcel index.html
```


# Compile

```sh
rm -r dist
parcel build index.html --out-dir rw-player --no-source-maps  --public-url https://republicaweb.es/rw-player/
```

# Web

```html
<iframe width="100%" height="400" src="https://programadorwebvalencia.com/rw-player/" frameborder="0"></iframe> 
```
