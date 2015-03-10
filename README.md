Introduction
===

selfPos is a library for positioning elements in relative way.

## Quick use

```html
<script src="path/to/selfpos.js"></script>
<script>
    new selfPos().init();
</script>
```

##Options

###selfposSelector
It's the selector of the item which will be positioned

###selfposRelativeTo
Regarding who want to position the element. Support this values: `parent | document | window | selector`.
`selector` : valid dom selector.

##Data attributes
`data-h-offset` : horizontal offset of the element relative to his parent. This value is in %.
`data-v-offset` : vertical offset of the element relative to his parent. This value is in %.
`data-width`: Element width.
`data-height`: Element height.
`data-align`: Horizontal align of the item relative to his parent. Support this values: `left | center | right`
`data-valign`: vertical align of the item relative to his parent. Support this values: `top | middle | bottom`

