# Quick Start Guide - Viewing UML Diagrams

## Option 1: Online Viewer (Easiest)

1. Go to [PlantUML Online Server](http://www.plantuml.com/plantuml/uml/)
2. Copy the content from any `.puml` file
3. Paste it into the online editor
4. View the rendered diagram

## Option 2: VS Code Extension

1. Install "PlantUML" extension in VS Code
2. Open any `.puml` file
3. Press `Alt+D` (Windows/Linux) or `Option+D` (Mac) to preview
4. Or right-click and select "Preview PlantUML Diagram"

## Option 3: Command Line (Generate Images)

```bash
# Install PlantUML (requires Java)
# macOS:
brew install plantuml

# Linux:
sudo apt-get install plantuml

# Windows: Download from http://plantuml.com/download

# Generate PNG images
cd uml_diagrams
plantuml *.puml

# This will create PNG files for each diagram
```

## Option 4: GitHub/GitLab

PlantUML files will render automatically in GitHub/GitLab if you:
1. Create a markdown file with code blocks:
   ```markdown
   \`\`\`plantuml
   @startuml
   ... your diagram code ...
   @enduml
   \`\`\`
   ```

## Diagram List

1. **class_diagram.puml** - System classes and relationships
2. **sequence_diagram.puml** - Prediction flow sequence
3. **use_case_diagram.puml** - User interactions
4. **component_diagram.puml** - System components
5. **deployment_diagram.puml** - Deployment architecture
6. **activity_diagram.puml** - Prediction workflow
7. **state_diagram.puml** - Application states
8. **er_diagram.puml** - Entity relationships
9. **system_architecture.puml** - Overall system architecture

## Recommended Tools

- **VS Code** with PlantUML extension (best for development)
- **IntelliJ IDEA** / **PyCharm** (built-in PlantUML support)
- **Online PlantUML Server** (quick viewing)
- **Draw.io** (can import PlantUML)









