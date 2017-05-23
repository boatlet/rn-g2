

function getHTML(script) {
  const HTML = `
<!DOCTYPE html>\n

<html>
  <head>
    <meta charset="utf-8">
    <title>柱状图</title>
    <meta name="viewport" content="initial-scale=1.0">
    <!-- 引入 GM 脚本 -->
    <script src="https://a.alipayobjects.com/g/datavis/g2/2.3.1/g2.js"></script>
  </head>
  <body>
    <div id="c1"></div>
    <script>
     ${script}
    </script>
  </body>
</html>
`;
  return HTML;
}

export default getHTML;
