document.addEventListener('DOMContentLoaded', function() {
    // Display student info from session storage
    const studentName = sessionStorage.getItem('studentName') || 'Guest User';
    const studentUID = sessionStorage.getItem('studentUID') || 'N/A';
    
    document.getElementById('student-name').textContent = studentName;
    document.getElementById('student-uid').textContent = studentUID;
    document.getElementById('student-branch').textContent = 'Computer Science';
    document.getElementById('attendance-percentage').textContent = '85%';
    
    const scannerStatus = document.getElementById('scanner-status');
    const fingerprintScanner = document.querySelector('.fingerprint-scanner img');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');
    
    // Function to handle biometric authentication
    function authenticateWithBiometrics() {
        scannerStatus.textContent = 'Initializing fingerprint sensor...';
        
        // Check if WebAuthn is supported
        if (window.PublicKeyCredential) {
            // Create the authentication options
            const options = {
                publicKey: {
                    challenge: new Uint8Array([21, 31, 105]), // This would be a server-generated challenge in production
                    rpId: window.location.hostname,
                    userVerification: 'required', // This forces biometric authentication if available
                    timeout: 60000,
                }
            };
            
            // Start the authentication process
            navigator.credentials.get(options)
                .then(function(credential) {
                    // Authentication successful
                    scannerStatus.textContent = 'Fingerprint verified! Marking attendance...';
                    
                    // Simulate attendance marking
                    setTimeout(function() {
                        scannerStatus.textContent = 'Attendance marked successfully!';
                        
                        // Redirect to schedule page after successful attendance
                        setTimeout(function() {
                            window.location.href = 'schedule.html';
                        }, 2000);
                    }, 1500);
                })
                .catch(function(err) {
                    // Authentication failed
                    scannerStatus.textContent = 'Authentication failed: ' + err.message;
                    console.error('Authentication error:', err);
                    
                    // Provide a retry option
                    setTimeout(function() {
                        scannerStatus.textContent = 'Tap to try again';
                    }, 2000);
                });
        } else {
            // WebAuthn not supported, fallback to simulation
            scannerStatus.textContent = 'Biometric authentication not supported. Simulating...';
            
            // Simulate scanning process
            setTimeout(function() {
                scannerStatus.textContent = 'Processing...';
                
                // Simulate fingerprint verification
                setTimeout(function() {
                    scannerStatus.textContent = 'Attendance marked successfully!';
                    
                    // Redirect to schedule page after successful attendance
                    setTimeout(function() {
                        window.location.href = 'schedule.html';
                    }, 2000);
                }, 1500);
            }, 1500);
        }
    }
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // On mobile devices, show the dedicated button
        mobileAuthBtn.style.display = 'block';
        scannerStatus.textContent = 'Tap the button below to use your device fingerprint';
    } else {
        // On desktop, use the image click
        scannerStatus.textContent = 'Click the fingerprint image to simulate scanning';
    }
    
    // Add event listeners
    fingerprintScanner.addEventListener('click', authenticateWithBiometrics);
    mobileAuthBtn.addEventListener('click', authenticateWithBiometrics);
});