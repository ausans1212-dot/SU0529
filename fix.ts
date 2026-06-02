import fs from 'fs';

const filePath = 'src/components/ArtworkCard.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of >\n                        購買連結\n                        <ExternalLink
content = content.replace(
  />(\r?\n)\s*購買連結(\r?\n)\s*<ExternalLink/g,
  `>$1                        {page.linkText || (language === 'zh' ? '購買連結' : 'Purchase')}$2                        <ExternalLink`
);

fs.writeFileSync(filePath, content);
console.log('Fixed');
