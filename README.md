# Shorten URL

## Subject

Design a shorten URL system.

```JSON
{
    "id": 1234,
    "shortened_url": "http://shorten.io/sY4",
    "original_url": "http://somewebsite.com"
}
```

## Design & Analysis

### Shorten Algorithm

In order to shorten a URL, we need an algorithm meets following requirements

- It should take a string as its input, and return a string as output.
- The output should be independent.
  - It is OK to obtain the original URL by reverse engineering the shortened URL.
  - But it is not OK that other shortened URLs can be guessed from a given shortened URL. i.e. The next object id can be guessed by increment 1 to the previous job id.
- The result should be equally distributed. In another word, for each possible output, they should have equal possibility to be the output

### System Capacity

Base on the example above, the shortened URL would have format of `http://shorten.io/{xxx}`. For the identifier `xxx`, let's assume

- the length is 3 chars
- for each char, it can only be a-z, A-Z or 0-9

So the whole capacity of our shorten-url system would be
`(26 + 26 + 10)^3 = 238,328`. This means our system is able to contain **at most** `238,328` URLs.

### Use of Hash Algorithms

One popular approach is using the object id from database and then convert it into base 62. Then use the base 62 string as the shortened URL identifier.

The downsides for this approach are

- It exposes the database object id, which exposes the number of objects stored in the system as well.
- As the db object id incremented, there is no easy way to look back. For example later, the shortened URL needs to be expired after a certain time. There is no easy way to reused the shorten URL identifier. This makes shorten URL identifier keeps growing.

To solve the issue above, Hash algorithms, like MD5, SHA256, SHA1 and SHA512, are used on the original URL, and partial of the hash string is used as the shortened URL identifier.

### To Base 62

After hashed, the binary hashed result would be coverted to base 62. In our system, the shortened URL only has a length of 3. So the first 3 chars are token from the converted hash string.

#### *Why not use the last bytes of the hash, then convert to base 62

This 3-char identifier can be represented/stored as 4 or 5 bytes.

```none
16^5 = 1,048,576
62^3 =   238,328
16^4 =    65,536
```

So we can take the last 5 bytes of the hash result and convert it to base 62 as the 3-char identifier for the shortened URL.

In this case, after converting to base 62, the result could be either 3 chars or 4 chars. If it is 4 chars, we will take the last 3.

This solution is not good, because it breaks the equally possibility for shortened URL identifiers.

```none
0xfffff = 4oMv(62)
```

For `oMv`, there are `0oMv`, `1oMv`, `2oMv`, `3oMv` and `4oMv`, total 5 4-char result mapping to it.

However, for `oMz`, there are `0oMz`, `1oMz`, `2oMz`, and `3oMv`, total 4 4-char result mapping to it. `4oMz(62)` is bigger than `0xfffff`.

`oMv` and `oMz` have different possibility as the output of the system.

### Example

Let's use `http://google.com` as an example.

The SHA256 hash result of `http://google.com` is

```none
aa2239c17609b21eba034c564af878f3eec8ce83ed0f2768597d2bc2fd4e4da5
```

Then convert this to base 62

```none
Elk6fWZ9dDUkkxExoeUUcjW1NQjzkYKdlhQt1y2tt1X
```

We take the first 3 chars

```none
Elk
```

So the final shortened URL is

```none
http://shorten.io/Elk
```

### Conflicts

Hash algorithm could has confilicts. As only partial of the hashed string are used, it would cause more conflicts for the shortened URL identifiers.

One way to handle the conflict is hash the shortened URL identifier again, and taken partial of the result as the identifier.

```js
function getShort(url) {
    short = calulateShort(url)
    if (conflict(short)) {
        return getShort(short)
    } else {
        return short
    }
}
```

