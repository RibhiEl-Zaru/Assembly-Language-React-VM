<snippet>
  <content><![CDATA[

#  Project Name

This project was written by Ribhi El-Zaru with the supervision
of Robert Muller for use by the Computer Science 101 Honors class
at Boston College in 2017.


Below you will find some information on how to use this webapp
to visualize and customize your assembly language code, as well
as details regarding constraints and features of the web application.


## Installation


## Usage

Description of the Registers used in the SVM are below.

Register PC is the program counter,
Register PSW is the program status word,
Register RA is the return address register,
Register RZ holds the constant 0,
Registers RO through R3 are general purpose registers.


SVM Instructions

SVM has 16 instructions. In the descriptions below, Rd, Rs and Rt refer to one of the general purpose registers, with Rd denoting a destination of an operation and Rs and Rt denoting source registers. We'll use the symbol RAM to refer to the random access memory, the symbol addr to refer to a non-negative integer address in memory and the notation RAM[addr] to refer to the contents of location addr in the memory. We'll use the symbol disp to refer to an integer displacement that may (or may not) be added to the PC register to alter the flow of control.
All instructions leave the RA and PSW register alone unless specified otherwise.

LOD Rd, offset(Rs): let base be the contents of register Rs. Then this loads RAM[base + offset] into register Rd.
Li Rd, number: loads number into register Rd.
STO Rs, offset(Rd): let base be the contents of register Rd, stores the contents of register Rs into location base + offset in the memory.
MOV Rd, Rs: copies the contents of register Rs into register Rd.
ADD Rd, Rs, Rt: adds the contents of registers Rs and Rt and stores the sum in register Rd.
SUB Rd, Rs, Rt: subtracts the contents of register Rt from Rs and stores the difference in register Rd.
MUL Rd, Rs, Rt: multiplies the contents of register Rt from Rs and stores the product in register Rd.
DIV Rd, Rs, Rt: divides the contents of register Rs by Rt and stores the integer quotient in register Rd.
CMP Rs, Rt: sets PSW = Rs - Rt. Note that if Rs > Rt, then PSW will be positive, if Rs === Rt, then PSW will be 0 and if Rs < Rt, then PSW will be negative.
JSR disp: sets RA = PC and then PC = PC + disp.
R: sets PC = RA.
BLT disp: if PSW is negative, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW >= 0, this instruction does nothing.
BEQ disp: if PSW === 0, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW != 0, this instruction does nothing.
BGT disp: if PSW, is positive, causes the new value of PC to be the sum PC + disp. Note that if disp is negative, this will cause the program to jump backward in the sequence of instructions. If PSW <= 0, this instruction does nothing.
JMP disp: causes the new value of PC to be the sum PC + disp.
HLT: causes the svm machine to print the contents of registers PC, PSW, RA, R0, R1, R2 and R3. It then stops, returning ().



## Contributing

## Credits

## License

]]</content>
<tabTrigger> readme </tabTrigger>

</snippet>
