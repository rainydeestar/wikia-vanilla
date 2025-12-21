# wikia-vanilla
For now, this is just a text editor with a custom markup language. Just write text in the box and it'll render.
## Headings
It uses typical # headings. So:
~~~~
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
~~~~
Heading 1 should automatically add a line break.
## Text Formatting
Italics works with one asterisks, bold two:
~~~~
*Italics*
**Bold**
~~Strikethrough~~
__Underline__
~~~~
## Lists
Two types: Ordered and unordered. You can nest them however you want, but you should avoid misuing the syntax.
~~~~
* List item 1
* List item 2
** List item 2.a
** List item 2.b
*** List item 2.b.1
* List item 3

- Ordered list item 1
- Ordered list item 2
~~~~
Again, you can mix and match, just don't be stupid.
## Special characters
Because of the syntax, you must do special things for some characters. Here's a simple table:
~~~~
* : \*
\ : \\ 		(yes, you need 2 backslashes)
~~~~
## Giant linebreak
Yep, those exist. One is automatically used after Heading 1. To add more, simply
~~~~
----
~~~~
