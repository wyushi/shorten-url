# Shorten URL

## Subject

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

Here SHA256 hash algorithm could be used to shorten the URL.

### System Capacity

Base on the example above, the shortened URL would have format of `http://shorten.io/{xxx}`. For the identifier `xxx`, let's assume

- the length is 3 chars
- for each char, it can only be a-z, A-Z or 0-9

So the whole capacity of our shorten-url system would be
`(26 + 26 + 10)^3 = 238,328`. This means our system is able to contain **at most** `238,328` URLs.

### SHA256 to Base 62

After hashed, the binary hashed result would be coverted to base 62. And then the last 3 chars are used as the shortened URL identifier.

#### Alernative Way

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

#### Example

Let's use `http://google.com` as an example.

The SHA256 hash result of `http://google.com` is

```none
aa2239c17609b21eba034c564af878f3eec8ce83ed0f2768597d2bc2fd4e4da5
```

Then convert this to base 62

```none
Elk6fWZ9dDUkkxExoeUUcjW1NQjzkYKdlhQt1y2tt1X
```

We take the last 3 chars

```none
t1X
```

So the final shortened URL is

```none
http://shorten.io/t1X
```

### Conflict
