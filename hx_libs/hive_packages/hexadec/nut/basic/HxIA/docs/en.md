# Hexadec Interaction Area

## When to Use

Trigger an interaction operation.

## Component Info

| item                    | value         |
| ----------------------- | ------------- |
| Component class name    | `HxIA`        |
| Component class extends | `HxComponent` |
| Custom element tagname  | `hx-ia`       |



## How to Use

In HTML:

```HTML
<hx-ia>
    <element slot="area">
        ... <!--Contents to trigger the operation-->
    </element>
</hx-ia>
```

 ## API

In HTML DOM custom attributes:

| attribute name | description                                                  |
| -------------- | ------------------------------------------------------------ |
| `inline`       | Set whether HxIA is inline block.  HxIA will be a inline-block as long as `inline` attribute exists. |

In JavaScript:

| property name | data type | default value | description |
| ------------- | ------------------------ | ----------- | ------------- |
| `isInline` | `boolean`                | `false` | Set whether HxIA is inline block. |

In CSS custom properties:

| property name       | data type | default value                              | description                   |
| ------------------- | --------- | ------------------------------------------ | ----------------------------- |
| `--hx-ia-act-color` | color     | ` var(--hx-global-theme-secondary-color) ` | Color of action part of HxIA. |
| `--hx-ia-bgcolor`   | color     | ` var(--hx-global-bgcolor) `               | Background color of HxIA.     |
| `--hx-ia-fgcolor`   | color     | ` var(--hx-global-fgcolor) `               | Foreground color of HxIA.     |