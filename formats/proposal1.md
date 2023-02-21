# 
> auto varname = [ include: 'filepath' ] as const

```
keyword -> {
    type -> dataType
    name -> varname
}

name -> varname

value -> {
    type -> import
    value -> 'filepath'
}

spec -> {
    type -> const
}
```
# 
> fn func(dataType name) -> {
> 
>   // do something
> 
>    return something
> 
> } as async

```
keyword -> {
    type -> function
    name -> func
    params -> {
        type -> dataType
        name -> name
    }
}

name -> func

value -> {
    type -> functionBody
    value -> {
        // do something
        return something
    }
}

spec -> {
    type -> async
}
```
#
> string dir = './commands/'

```
keyword -> {
    type -> dataType
    name -> string
}

name -> dir

value -> {
    type -> string
    value -> './commands/'
}

spec -> null
```

