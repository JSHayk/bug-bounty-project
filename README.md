## Projects
```
GET '/projects'
RESPONSE {
  id: number,
  organization: string,
  title: stirng,
  description: string,
  reward: {
    from: number,
    to: number
  },
  image_url: string,
  created_at: number
}
```
```
POST '/login'
BODY {
  email:string,
  password:string
}
RESPONSE {
  "token":string
}
```

```
POST '/sign-up'
BODY {
  email:string,
  password:string
  type:string
}
RESPONSE {
  
}
```

```
POST '/add-project'
BODY {
  title:string,
  description:string
}
RESPONSE {
  id:int
}
```

```
POST '/upload-image'
BODY {
  ------------
  ------------
}
RESPONSE {
  ---------
}
```
```
GET '/get-projects'
BODY {

}
RESPONSE {
  projects:array
}
```

```
GET '/get-project'
BODY {
  id:int
}
RESPONSE {
  project:dict
}
```



