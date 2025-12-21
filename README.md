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
`Inline codeblock`
[Sentence](Link)
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
## Tables
Okay, they're odd.
### Syntax
| Symbol | Meaning | Explanation |
|--|--|--|
| {\| | Beginning of table | Can be followed immediately by a space and attributes. |
| \|+ | Caption | It's like adding a title to the table. |
| \|- | Table row | Everything after the next one or the end of the table belongs to the same row. |
| ! | Head | Adds a "header cell". |
| \| | Cell | Adds a cell. |
| \| | HTML | For cells and header cells, allows to specify attributes before the content. |
| \|} | End of table | Should not have anything after it ever.|
### Demonstration
~~~~
{|
|+ Title (Optional)
|-
! Col 1
! Col 2
! Col 3
|-
| Cell A
| Cell B
| Cell C
|-
| Cell D
| Cell E
| Cell F
|} (Ends the table)
~~~~
### Attributes
There are some common attributes that may be useful:
* **rowspan**: Allows a cell to take more space vertically.
* **colspan**: Allows a cell to take more space horizontally.
* **class**: In truth, there aren't any useful classes yet. But they will be used to define default styles and more.
Here's an exemple. Use the editor to see what it does.
~~~~
{| border
|+ **This is a crazy test**
|-
! Column 1\n(row 1 cell 1)
! Column 2\n(row 1 cell 2)
! Column 3\n(row 1 cell 3)
|-
| rowspan="2" | A\n(row 2 cell 1)\n`rowspan=2`
| colspan=2 style="text-align: center;" | B\n(row 2 cell 2)\n```colspan=2```
|-
| C\n(row 3 cell 1)
| D\n(row 3 cell 2)
|-
| E\n(row 4 cell 1)
| rowspan=2 colspan=2 style="text-align: center;" |F\n(row 4 cell 2)\n`rowspan=2 colspan=2`
|-
| G\n(row 5 cell 1)
|-
| colspan=3 style="text-align: center;" | H\n(row 6 cell 1)\n`colspan=3`
|}
~~~~
Try playing around with that.
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
