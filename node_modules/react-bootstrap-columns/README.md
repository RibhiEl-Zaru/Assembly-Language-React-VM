# react-bootstrap-columns
React Component for text flow columns

Use to flow text between a number of bootstrap columns.

It is a very simple component.

Is only useful for bootstrap / react projects

###Current Limitations

1. Does not split across paragraphs
2. Uses only one bootstrap size class

###Install

<pre>
npm install --save react-bootstrap-columns
</pre>


###Example

To render this sort of layout:

<table>
<tbody>
    <tr>
        <td>First Paragraph</td>
        <td>Third Paragraph and so on</td>
    </tr>
    <tr>
        <td>Second Paragraph</td>
    </tr>
</tbody>
</table>

Use this:

<pre>
const React = require('react'),
    Columns = require('react-bootstrap-columns');

const Content = React.createClass({

    const columnStyle = {
        textAlign: "justify",
        fontFamily: font.family,
        fontSize: font.size,
        fontWeight: font.weight,
        lineHeight: font.lineHeight
    };

    render: function () {
        return (
            &lt;div className="row"&gt;
                &lt;div className="col-md-12"&gt;
                &lt;Columns columns={2}
                    columnSize='md'
                    style={columnStyle}&gt;
                
                    &lt;span&gt;
                        First paragraph
                    &lt;/span&gt;
                    
                    &lt;span&gt;
                        Second paragraph
                    &lt;/span&gt;
                    
                    &lt;span&gt;
                        Third paragraph and so on
                    &lt;/span&gt;
                    
                &lt;/Columns&gt;

               
                &lt;/div&gt;
            &lt;/div&gt;
        );
    }
});
</pre>


