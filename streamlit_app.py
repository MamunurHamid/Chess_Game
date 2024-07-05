import streamlit as st
import os



# Function to read the contents of a file
def read_file(filepath):
    file_path = os.path.join(os.path.dirname(__file__), filepath)
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Read the HTML, CSS, and JavaScript files
html_content = read_file('index.html')
css_content = read_file('style.css')
js_content = read_file('script.js')

# Set the page configuration
st.set_page_config(page_title="Chess Game", page_icon="♟️")

# Inject CSS into the page
st.markdown(f"<style>{css_content}</style>", unsafe_allow_html=True)

# Display the HTML content
st.markdown(html_content, unsafe_allow_html=True)

# Inject JavaScript into the page
st.markdown(f"<script>{js_content}</script>", unsafe_allow_html=True)

# Streamlit component to capture clicks
st.write(
    """
    <script>
    const gameCells = document.querySelectorAll('.gamecell');
    gameCells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log(cell.id);
            window.parent.postMessage({type: 'cell_click', id: cell.id}, '*');
        });
    });
    </script>
    """,
    unsafe_allow_html=True,
)

# Placeholder for interactive outputs
cell_clicked = st.empty()

# JavaScript event listener for receiving messages
st.markdown(
    """
    <script>
    window.addEventListener('message', event => {
        if (event.data.type === 'cell_click') {
            console.log('Cell clicked:', event.data.id);
            document.getElementById('streamlit-cell-clicked').innerText = 'Cell clicked: ' + event.data.id;
        }
    });
    </script>
    <div id="streamlit-cell-clicked" style="margin-top: 20px; color: red;"></div>
    """,
    unsafe_allow_html=True,
)

# Debug output
st.write("Streamlit is running...")
