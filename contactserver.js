// Initialize Supabase client
const supabaseUrl = 'https://ngmumxrjrtsxudebokzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nbXVteHJqcnRzeHVkZWJva3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MTc1NzcsImV4cCI6MjA1OTQ5MzU3N30.vHbd2hetos0D2-dfeJEExkySlL03XySi29IN4hnFGUA';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Test insert
async function testInsert() {
    const { data, error } = await supabase
        .from('contacts')
        .insert([{ name: 'Test', email: 'test@example.com', message: 'Hello' }]);
    console.log('Test Insert:', { data, error });
}
testInsert();

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Submitting:', { name, email, message });

    const { data, error } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);

    console.log('Response:', { data, error });

    const responseElement = document.getElementById('response');
    if (error) {
        console.error('Insert failed:', error);
        responseElement.textContent = 'Error: ' + error.message;
    } else {
        responseElement.textContent = 'Message sent successfully!';
        document.getElementById('contactForm').reset();
    }
});    