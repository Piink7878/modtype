// กำหนดข้อความที่ใช้ฝึกพิมพ์
const texts = [
    // ชุดคำศัพท์ทั่วไปสำหรับโปรแกรมเมอร์
    "function variable loop array object string integer syntax error input output compile debug execute stack queue recursion condition event asynchronous promise",
    // ชุดคำศัพท์ภาษา C/C++
    "goto float sizeof switch typedef continue static for char return malloc extern enum if break main long void do while case int #define scanf const free unsigned printf #include signed",
    // ชุดคำศัพท์ภาษา Python
    "def while import if try lambda else class for return break continue with global except is None yield and or del assert finally from in not pass True False nonlocal",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับอัลกอริทึม
    "binary search merge sort quick sort dynamic programming greedy algorithm graph tree heap hash divide conquer brute force backtracking optimization traversal node",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับเว็บ
    "HTML CSS JavaScript React Angular Vue Node.js Express RESTful API GraphQL MongoDB MySQL authentication authorization session cookie token encryption hashing",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับฐานข้อมูล
    "database schema table row column primary key foreign key index query SQL SELECT INSERT UPDATE DELETE JOIN INNER OUTER LEFT RIGHT CROSS UNION aggregate normalization ACID transaction rollback commit NoSQL Redis Cassandra Elasticsearch",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับระบบปฏิบัติการ
    "kernel process thread multitasking scheduling deadlock semaphore mutex paging memory management virtual memory filesystem I/O interrupt bootloader shell fork pipe socket daemon signal swap cache CPU core context switch",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับเครือข่าย
    "protocol IP TCP UDP HTTP HTTPS FTP DNS DHCP ARP ICMP NAT firewall router switch proxy load balancer subnet mask gateway port socket VPN SSL/TLS bandwidth latency packet traceroute",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับ DevOps
    "CI/CD pipeline Docker Kubernetes Jenkins GitHub Actions Terraform Ansible Puppet Chef monitoring logging Prometheus Grafana deployment scaling load balancing automation container orchestration version control repository",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับ AI/ML
    "machine learning deep neural network supervised reinforcement learning dataset training validation testing extraction hyperparameter optimization overfitting underfitting backpropagation convolution recurrent ",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับการพัฒนาเกม
    "game engine Unity Unreal asset physics shader animation sprite 3D 2D collision detection rendering framerate level design character controller AI pathfinding particle system skybox lighting texture rigging",
    // ชุดคำศัพท์ที่เกี่ยวข้องกับ Cybersecurity
    "encryption decryption hash algorithm symmetric asymmetric key certificate public private cryptography brute force attack phishing malware ransomware firewall antivirus intrusion detection penetration testing vulnerability zero-day exploit"
];

// ฟังก์ชันสุ่มชุดข้อความและสลับคำ
function getRandomText() {
    // เลือกชุดข้อความแบบสุ่ม
    const selectedText = texts[Math.floor(Math.random() * texts.length)];
    console.log("Selected Text:", selectedText);  // ตรวจสอบว่าเลือกชุดข้อความถูกต้อง
    // แยกข้อความเป็นคำ
    const words = selectedText.split(" ");
    // สลับลำดับคำแบบสุ่ม
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    // รวมคำกลับเป็นข้อความ
    return words.join(" ");
}

// เลือกข้อความสุ่มและแสดงบนหน้าเว็บ
let textToType = document.getElementById('text-to-type');
textToType.textContent = getRandomText(); // อัพเดตข้อความที่แสดงบนหน้าเว็บ

// ตัวแปรสำหรับการจับเวลา
let inputBox = document.getElementById('input-box');
let timerElement = document.getElementById('timer');
let accuracyElement = document.getElementById('accuracy');
let statusElement = document.getElementById('status'); // แสดงสถานะ
let characterCountElement = document.getElementById('character-count'); // แสดงจำนวนตัวอักษรที่พิมพ์
let timeRemaining = 60; // เวลาเริ่มต้น 60 วินาที
let timerInterval;
let stopTimer = false; // ตัวแปรที่ใช้ในการหยุดเวลา
let startTime = false; // ตัวแปรตรวจสอบว่าเริ่มจับเวลาหรือยัง
let totalTime = 0; // เก็บเวลาที่ใช้ในการพิมพ์
let totalCharactersTyped = 0; // จำนวนตัวอักษรที่พิมพ์ถูกต้องทั้งหมด
let correctWordsCount = 0; // จำนวนคำที่พิมพ์ถูกต้อง


// ฟังก์ชันเริ่มนับเวลาถอยหลัง 60 วินาที
function startCountdown() {
    timerElement.textContent = `Time: ${timeRemaining} seconds`;

    timerInterval = setInterval(function () {
        if (timeRemaining > 0 && !stopTimer) {
            timeRemaining--;
            timerElement.textContent = `Time: ${timeRemaining} seconds`;
        }

        // เมื่อเวลาหมด
        if (timeRemaining <= 0 || stopTimer) {
            clearInterval(timerInterval);
            if (!stopTimer) {
                showPopup("Time's up!", 0, timeRemaining);
            }
        }
    }, 1000); // อัปเดตทุก 1 วินาที
}

// ฟังก์ชันคำนวณ WPM (Words Per Minute)
function calculateWPM() {
    if (startTime) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // ใช้ Math.floor เพื่อตัดเศษทศนิยม
        if (elapsedTime > 0) {
            const wordCount = totalCharactersTyped / 5;
            const wpm = wordCount / (elapsedTime / 60); // แปลงเวลาเป็นนาที
            return wpm.toFixed(2);
        }
    }
    return 0;
}


// เริ่มจับเวลาเมื่อผู้ใช้เริ่มพิมพ์
inputBox.addEventListener('input', function () {
    // เริ่มจับเวลาเมื่อผู้ใช้เริ่มพิมพ์
    if (!startTime) {
        startCountdown(); // เริ่มนับเวลาถอยหลังเมื่อเริ่มพิมพ์
        startTime = Date.now(); // กำหนดเวลาที่เริ่มพิมพ์
    }
    checkAccuracy(inputBox.value); // ตรวจสอบความแม่นยำขณะพิมพ์
    characterCountElement.textContent = `Characters Typed: ${totalCharactersTyped}`; // อัปเดตจำนวนตัวอักษร
});


function checkAccuracy(inputText) {
    correctWordsCount = 0; // รีเซ็ตจำนวนคำที่ถูกต้อง
    totalCharactersTyped = 0; // รีเซ็ตจำนวนตัวอักษรที่พิมพ์ถูกต้อง

    // แยกข้อความต้นฉบับและข้อความที่พิมพ์เป็นคำ
    const originalWords = textToType.textContent.split(' ');
    const inputWords = inputText.split(' ');

    // ตรวจสอบคำที่พิมพ์
    for (let i = 0; i < inputWords.length; i++) {
        if (inputWords[i].trim().toLowerCase() === originalWords[i].trim().toLowerCase()) {
            correctWordsCount++; // เพิ่มจำนวนคำที่พิมพ์ถูกต้อง
            totalCharactersTyped += inputWords[i].length; // นับตัวอักษรในคำที่พิมพ์ถูกต้อง
        } else {
            break; // หากเจอคำที่ผิดจะหยุดตรวจสอบคำที่เหลือ
        }
    }

    // คำนวณความแม่นยำจากจำนวนตัวอักษรที่พิมพ์ถูกต้อง
    let accuracy = (totalCharactersTyped / (originalWords.join('').length)) * 100;
    accuracyElement.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;

    // หากพิมพ์ตรง 100% ให้หยุดการจับเวลา
    if (accuracy === 100) {
        stopTimer = true;
        showPopup("Finish!", accuracy.toFixed(2), timeRemaining); // ส่งค่าความแม่นยำที่คำนวณแล้ว
    }
}




// ฟังก์ชันแสดง pop-up
function showPopup(status, accuracy, remainingTime) {
    const popup = document.getElementById('popup');
    const popupStatus = document.getElementById('popup-status');
    const popupAccuracy = document.getElementById('popup-accuracy');
    const popupTime = document.getElementById('popup-time');
    const popupTyped = document.getElementById('popup-typed');
    const popupCharacters = document.getElementById('popup-characters'); // จำนวนตัวอักษรที่พิมพ์
    const popupWPM = document.getElementById('popup-wpm'); // แสดง WPM

    // คำนวณ WPM
    let wpm = calculateWPM();

    // แสดงข้อมูลใน pop-up
    popupStatus.textContent = status;
    popupAccuracy.textContent = `Accuracy: ${accuracy}%`; // เพิ่มความแม่นยำ
    popupTime.textContent = `Time: ${60 - remainingTime} seconds`; // เวลาที่ใช้
    popupCharacters.textContent = `Total Characters Typed: ${totalCharactersTyped}`; // จำนวนตัวอักษรที่พิมพ์
    popupWPM.textContent = `WPM: ${wpm}`; // WPM ที่คำนวณได้

    // แสดง pop-up
    popup.style.display = "flex"; // แสดง pop-up
}


// ปิด pop-up
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = "none"; // ซ่อน pop-up
}

// Reset Function (Restart)
function startNewTest() {
    textToType.textContent = getRandomText(); // Update to a new text
    inputBox.value = ''; // Clear input box
    accuracyElement.textContent = "Accuracy: 0%"; // Reset accuracy
    statusElement.textContent = ""; // Clear status
    timeRemaining = 60; // Reset the timer to 60 seconds
    timerElement.textContent = `Time: ${timeRemaining} seconds`; // Reset timer display

    // Reset variables
    stopTimer = false;
    startTime = false; // Ensure timer does not start until typing begins
    totalCharactersTyped = 0; // Reset total characters typed
    correctWordsCount = 0; // Reset correct word count
    clearInterval(timerInterval); // Stop the old timer

    // Update UI for reset character count
    characterCountElement.textContent = "Characters Typed: 0"; 

    inputBox.focus();
}


function stopGame() {
    stopTimer = true;
    inputBox.value = ''; // Clear input box
    showPopup("Time's up!", accuracyElement.textContent.split(": ")[1], timeRemaining); // แสดง pop-up เมื่อเวลาหมด
    resetGame(); // เคลียร์ข้อมูลทั้งหมดในเกม
}


// ปิดการคัดลอกข้อความ
document.getElementById('text-to-type').addEventListener('copy', function(e) {
    e.preventDefault(); // ปิดการทำงานของการคัดลอก
    alert('ข้อความนี้ไม่สามารถคัดลอกได้');
});

// ปิดการคลิกขวาบนข้อความ
document.getElementById('text-to-type').addEventListener('contextmenu', function(e) {
    e.preventDefault(); // ปิดการคลิกขวา
    alert('การคลิกขวาถูกปิดใช้งาน');
});