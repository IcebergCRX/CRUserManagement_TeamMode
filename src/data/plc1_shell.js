const Plc1_Shell = {
    host: "plc1",
    shellOutput: {    
        ifconfig: `<pre>lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
    inet 127.0.0.1  netmask 255.0.0.0
    inet6 ::1  prefixlen 128  scopeid 0x10<host>
    loop  txqueuelen 1000  (Local Loopback)
    RX packets 313774  bytes 21480200 (21.4 MB)
    RX errors 0  dropped 0  overruns 0  frame 0
    TX packets 313774  bytes 21480200 (21.4 MB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

plc1-eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
    inet 10.0.0.1  netmask 255.255.255.0  broadcast 10.0.0.255
    inet6 fe80::200:ff:fe00:1  prefixlen 64  scopeid 0x20<link>
    ether 00:00:00:00:00:01  txqueuelen 1000  (Ethernet)
    RX packets 65675  bytes 5452486 (5.4 MB)
    RX errors 0  dropped 0  overruns 0  frame 0
    TX packets 91471  bytes 7500318 (7.5 MB)
    TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0</pre>`,
    arp: `<pre>Address                  HWtype  HWaddress           Flags Mask            Iface
    10.0.0.5                 ether   00:00:00:00:00:05   C                     plc1-eth0
    10.0.0.3                 ether   00:00:00:00:00:03   C                     plc1-eth0
    10.0.0.4                 ether   00:00:00:00:00:00   C                     plc1-eth0
    10.0.0.2                 ether   00:00:00:00:00:02   C                     plc1-eth0</pre>`,
    whoami: `<pre>root</pre>`,
    arpStatic: `<pre>Address                  HWtype  HWaddress           Flags Mask            Iface
10.0.0.3                 ether   00:00:00:00:00:03   CM                    plc1-eth0
10.0.0.5                 ether   00:00:00:00:00:05   C                     plc1-eth0
10.0.0.2                 ether   00:00:00:00:00:02   C                     plc1-eth0
10.0.0.4                 ether   00:00:00:00:00:00   C                     plc1-eth0</pre>`,

    },
    arpFlag: "arp -s 10.0.0.2 00:00:00:00:00:02",
    empty: `<pre></pre>`
}

export default Plc1_Shell;