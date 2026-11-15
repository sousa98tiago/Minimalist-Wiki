export function remarkWikiLinks() {
  return (tree) => {
    function transform(node) {
      if (!Array.isArray(node.children)) return;

      const newChildren = [];

      for (const child of node.children) {
        if (child.type !== "text") {
          transform(child);
          newChildren.push(child);
          continue;
        }

        const regex = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

        let lastIndex = 0;
        let match;

        while ((match = regex.exec(child.value)) !== null) {
          // Preserve text before the link
          if (match.index > lastIndex) {
            newChildren.push({
              type: "text",
              value: child.value.slice(lastIndex, match.index),
            });
          }

          // Create the internal wiki link
          newChildren.push({
            type: "link",
            url: `wiki-article:${match[1].trim()}`,
            children: [
              {
                type: "text",
                value: match[2],
              },
            ],
          });

          lastIndex = regex.lastIndex;
        }

        // If there were no links, preserve the original node ONCE.
        if (lastIndex === 0) {
          newChildren.push(child);
        }
        // Otherwise, preserve any text after the final link.
        else if (lastIndex < child.value.length) {
          newChildren.push({
            type: "text",
            value: child.value.slice(lastIndex),
          });
        }
      }

      node.children = newChildren;
    }

    transform(tree);
  };
}
