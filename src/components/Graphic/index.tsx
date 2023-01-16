
const default_fillcolor: string = 'none';
const default_strokecolor: string = 'white';
const default_width: number = 348;
const default_height: number = 348;
const default_scale_factor: number = 1;

interface IProps {
    fillcolor?: string,
    strokecolor?: string,
    scale?: number
}



export default function Graphic({ scale = default_scale_factor, fillcolor = default_fillcolor, strokecolor = default_strokecolor }: IProps) {

    return (
        <svg width={default_width * scale} height={default_height * scale} viewBox="0 0 348 348" fill={fillcolor??default_fillcolor} xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M67.0458 24.0459C66.7846 24.8461 66.5442 25.6553 66.325 26.4733C66.1058 27.2914 65.9095 28.1122 65.7355 28.9359C65.4743 29.7361 65.2339 30.5453 65.0147 31.3634C53.4369 74.5726 105.388 126.036 181.052 146.31C256.715 166.584 327.438 147.991 339.016 104.782C339.235 103.964 339.431 103.143 339.605 102.319C339.866 101.519 340.107 100.71 340.326 99.8917C340.545 99.0737 340.742 98.2527 340.915 97.4291C341.177 96.6288 341.417 95.8197 341.636 95.0017C341.855 94.1839 342.052 93.3632 342.226 92.5398C342.487 91.7397 342.727 90.9308 342.946 90.113C343.165 89.2948 343.362 88.4736 343.536 87.6497C343.797 86.8493 344.038 86.0399 344.257 85.2217C344.476 84.4039 344.672 83.5832 344.846 82.7597C345.107 81.9597 345.348 81.1508 345.567 80.333C345.786 79.515 345.982 78.694 346.156 77.8704C346.251 77.5811 346.342 77.2907 346.431 76.9991C338.504 81.5649 329.425 85.3137 319.429 88.1831C312.644 91.7903 304.875 94.7619 296.266 97.0252C268.378 104.357 232.418 103.994 195.071 93.9873C157.725 83.9804 126.401 66.314 105.915 46.0208C98.0263 38.2061 91.8211 30.0907 87.4687 21.9353C104.993 51.5413 144.943 78.9839 195.464 92.521C242.664 105.168 287.941 102.691 318.138 88.5476C309.705 90.8862 300.638 92.6067 291.075 93.6726C264.21 99.3545 230.887 98.3417 196.382 89.096C159.036 79.0891 127.712 61.4227 107.226 41.1295C105.467 39.3871 103.792 37.6297 102.202 35.8603C89.5644 24.5852 79.7661 12.4185 73.4635 0.0120661C73.2533 0.676851 73.0574 1.34773 72.876 2.02465C72.6568 2.84267 72.4605 3.66351 72.2865 4.48717C72.0253 5.28745 71.7849 6.09664 71.5657 6.91466C71.3466 7.73245 71.1503 8.55305 70.9764 9.37649C70.7153 10.1766 70.475 10.9855 70.2558 11.8033C70.0366 12.6216 69.8402 13.4426 69.6662 14.2665C69.4049 15.067 69.1644 15.8764 68.9452 16.6947C68.7261 17.5125 68.5297 18.3331 68.3558 19.1565C68.0947 19.9566 67.8544 20.7655 67.6353 21.5833C67.4161 22.4014 67.2197 23.2222 67.0458 24.0459ZM86.1799 26.8634C103.716 56.4554 143.653 83.8808 194.154 97.4124C244.654 110.944 292.953 107.161 322.936 90.3021C315.097 95.1777 305.678 99.0951 294.956 101.914C267.068 109.245 231.108 108.883 193.761 98.876C156.415 88.8691 125.091 71.2027 104.605 50.9095C96.7291 43.1073 90.5313 35.0056 86.1799 26.8634ZM103.295 55.7995C95.4124 47.991 89.2109 39.8824 84.859 31.7336C102.389 61.3326 142.333 88.7667 192.844 102.301C243.354 115.835 291.664 112.049 321.645 95.1802C313.801 100.061 304.377 103.983 293.646 106.804C265.758 114.135 229.798 113.773 192.451 103.766C155.105 93.7591 123.781 76.0927 103.295 55.7995ZM83.5488 36.6236C87.9007 44.7724 94.1022 52.881 101.985 60.6895C122.47 80.9827 153.794 98.6491 191.141 108.656C228.487 118.663 264.448 119.025 292.336 111.694C303.066 108.873 312.491 104.951 320.334 100.07C290.353 116.939 242.044 120.725 191.533 107.191C141.023 93.6567 101.079 66.2226 83.5488 36.6236ZM100.674 65.5795C92.7918 57.771 86.5904 49.6624 82.2385 41.5135C99.7687 71.1125 139.712 98.5467 190.223 112.081C240.734 125.615 289.043 121.829 319.024 104.96C311.181 109.841 301.756 113.763 291.025 116.584C263.138 123.915 227.177 123.553 189.831 113.546C152.484 103.539 121.16 85.8727 100.674 65.5795ZM80.9283 46.4037C85.2802 54.5525 91.4816 62.6611 99.3641 70.4695C119.85 90.7627 151.174 108.429 188.52 118.436C225.867 128.443 261.827 128.805 289.715 121.474C300.446 118.653 309.871 114.731 317.714 109.85C287.733 126.719 239.424 130.505 188.913 116.971C138.402 103.437 98.4585 76.0026 80.9283 46.4037ZM98.0542 75.3582C90.1782 67.5561 83.9804 59.4544 79.629 51.3123C97.165 80.9042 137.102 108.33 187.603 121.861C238.103 135.393 286.402 131.61 316.385 114.751C308.545 119.626 299.127 123.544 288.405 126.363C260.517 133.694 224.557 133.332 187.21 123.325C149.864 113.318 118.54 95.6514 98.0542 75.3582ZM78.2973 56.1642C82.6497 64.3195 88.8548 72.4348 96.7436 80.2495C117.229 100.543 148.553 118.209 185.9 128.216C223.246 138.223 259.207 138.585 287.095 131.254C297.834 128.431 307.265 124.505 315.112 119.619C285.132 136.496 236.814 140.287 186.293 126.75C135.772 113.213 95.8219 85.7701 78.2973 56.1642ZM95.4337 85.1382C87.5576 77.3361 81.3598 69.2344 77.0085 61.0924C94.5445 90.6842 134.482 118.11 184.982 131.641C235.482 145.173 283.782 141.39 313.764 124.531C305.925 129.406 296.507 133.324 285.785 136.143C257.897 143.474 221.936 143.112 184.59 133.105C147.243 123.098 115.919 105.431 95.4337 85.1382ZM75.6877 65.9627C93.218 95.5616 133.161 122.995 183.672 136.53C234.183 150.064 282.492 146.277 312.473 129.409C304.63 134.29 295.205 138.212 284.474 141.033C256.587 148.364 220.626 148.002 183.28 137.995C145.933 127.988 114.609 110.321 94.1234 90.0282C86.241 82.2198 80.0396 74.1114 75.6877 65.9627ZM283.164 145.923C293.895 143.102 303.32 139.18 311.163 134.299C281.182 151.167 232.873 154.954 182.362 141.42C131.851 127.885 91.9074 100.451 74.3772 70.8523C78.7291 79.0011 84.9306 87.1097 92.8131 94.9182C113.299 115.211 144.623 132.878 181.969 142.885C219.316 152.892 255.276 153.254 283.164 145.923Z" fill="url(#paint0_linear_37_140)" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M280.374 323.374C280.635 322.573 280.875 321.764 281.094 320.946C281.314 320.128 281.51 319.307 281.684 318.484C281.945 317.683 282.186 316.874 282.405 316.056C293.983 272.847 242.031 221.384 166.368 201.11C90.7046 180.836 19.9817 199.429 8.40383 242.638C8.18465 243.456 7.98823 244.277 7.81432 245.101C7.55311 245.901 7.31273 246.71 7.09355 247.528C6.87437 248.346 6.67796 249.167 6.50405 249.991C6.24284 250.791 6.00246 251.6 5.78328 252.418C5.56416 253.236 5.36779 254.056 5.19392 254.88C4.93279 255.68 4.69249 256.489 4.47337 257.307C4.25413 258.125 4.05766 258.946 3.88371 259.77C3.62242 260.57 3.38198 261.38 3.16273 262.198C2.94361 263.016 2.74725 263.836 2.57337 264.66C2.31225 265.46 2.07194 266.269 1.85282 267.087C1.63364 267.905 1.43723 268.726 1.26331 269.549C1.1689 269.838 1.07721 270.129 0.988252 270.42C8.9151 265.855 17.9945 262.106 27.99 259.237C34.7757 255.629 42.5443 252.658 51.1534 250.394C79.0411 243.063 115.002 243.425 152.348 253.432C189.695 263.439 221.019 281.106 241.504 301.399C249.393 309.214 255.598 317.329 259.951 325.484C242.426 295.878 202.477 268.436 151.955 254.899C104.755 242.251 59.4782 244.729 29.2818 258.872C37.7141 256.533 46.7813 254.813 56.3446 253.747C83.2099 248.065 116.532 249.078 151.038 258.324C188.384 268.331 219.708 285.997 240.194 306.29C241.953 308.033 243.628 309.79 245.217 311.559C257.855 322.834 267.653 335.001 273.956 347.408C274.166 346.743 274.362 346.072 274.543 345.395C274.763 344.577 274.959 343.756 275.133 342.932C275.394 342.132 275.635 341.323 275.854 340.505C276.073 339.687 276.269 338.867 276.443 338.043C276.704 337.243 276.945 336.434 277.164 335.616C277.383 334.798 277.579 333.977 277.753 333.153C278.015 332.353 278.255 331.543 278.474 330.725C278.693 329.907 278.89 329.087 279.064 328.263C279.325 327.463 279.565 326.654 279.784 325.836C280.003 325.018 280.2 324.197 280.374 323.374ZM261.24 320.556C243.704 290.964 203.766 263.539 153.266 250.007C102.766 236.476 54.466 240.258 24.4835 257.118C32.3229 252.242 41.7413 248.325 52.4633 245.506C80.351 238.174 116.312 238.537 153.658 248.544C191.004 258.551 222.329 276.217 242.814 296.51C250.69 304.312 256.888 312.414 261.24 320.556ZM244.125 291.62C252.007 299.429 258.209 307.537 262.56 315.686C245.03 286.087 205.087 258.653 154.576 245.119C104.065 231.584 55.7559 235.371 25.7748 252.239C33.618 247.358 43.0429 243.437 53.7736 240.616C81.6613 233.284 117.622 233.647 154.968 243.654C192.315 253.661 223.639 271.327 244.125 291.62ZM263.871 310.796C259.519 302.647 253.317 294.539 245.435 286.73C224.949 266.437 193.625 248.771 156.279 238.764C118.932 228.757 82.9716 228.394 55.0838 235.726C44.3532 238.547 34.9283 242.468 27.0851 247.349C57.0662 230.481 105.375 226.694 155.886 240.229C206.397 253.763 246.34 281.197 263.871 310.796ZM246.745 281.84C254.628 289.649 260.829 297.757 265.181 305.906C247.651 276.307 207.707 248.873 157.196 235.339C106.686 221.804 58.3765 225.591 28.3954 242.459C36.2386 237.578 45.6635 233.657 56.3941 230.836C84.2819 223.504 120.243 223.867 157.589 233.874C194.935 243.881 226.259 261.547 246.745 281.84ZM266.491 301.016C262.139 292.867 255.938 284.759 248.055 276.95C227.57 256.657 196.246 238.99 158.899 228.984C121.553 218.977 85.5921 218.614 57.7044 225.946C46.9738 228.767 37.5489 232.688 29.7057 237.569C59.6869 220.701 107.996 216.914 158.507 230.449C209.017 243.983 248.961 271.417 266.491 301.016ZM249.365 272.061C257.241 279.864 263.439 287.965 267.79 296.107C250.254 266.515 210.317 239.09 159.817 225.559C109.317 212.027 61.0172 215.809 31.0346 232.669C38.8741 227.793 48.2924 223.876 59.0143 221.057C86.9021 213.725 122.863 214.088 160.209 224.095C197.555 234.102 228.88 251.768 249.365 272.061ZM269.122 291.255C264.77 283.1 258.565 274.985 250.676 267.17C230.19 246.877 198.866 229.21 161.52 219.204C124.173 209.197 88.2127 208.834 60.3249 216.166C49.5857 218.989 40.1543 222.915 32.3074 227.801C62.2871 210.924 110.606 207.133 161.127 220.67C211.648 234.207 251.598 261.649 269.122 291.255ZM251.986 262.281C259.862 270.083 266.06 278.185 270.411 286.327C252.875 256.735 212.938 229.31 162.437 215.779C111.937 202.247 63.6376 206.029 33.6551 222.889C41.4945 218.013 50.9128 214.096 61.6348 211.277C89.5226 203.945 125.483 204.308 162.83 214.315C200.176 224.322 231.5 241.988 251.986 262.281ZM271.732 281.457C254.201 251.858 214.258 224.424 163.747 210.89C113.237 197.356 64.9274 201.142 34.9463 218.011C42.7895 213.13 52.2144 209.208 62.9451 206.387C90.8329 199.055 126.794 199.418 164.14 209.425C201.486 219.432 232.81 237.098 253.296 257.391C261.178 265.2 267.38 273.308 271.732 281.457ZM64.2554 201.497C53.5247 204.318 44.0998 208.24 36.2566 213.121C66.2377 196.252 114.547 192.466 165.058 206C215.568 219.534 255.512 246.968 273.042 276.567C268.69 268.418 262.489 260.31 254.606 252.501C234.121 232.208 202.797 214.542 165.45 204.535C128.104 194.528 92.1431 194.165 64.2554 201.497Z" fill="url(#paint1_linear_37_140)" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M323.374 67.0458C322.573 66.7846 321.764 66.5442 320.946 66.325C320.128 66.1058 319.307 65.9095 318.484 65.7355C317.683 65.4743 316.874 65.2339 316.056 65.0148C272.847 53.4369 221.384 105.388 201.11 181.052C180.836 256.715 199.429 327.438 242.638 339.016C243.456 339.235 244.277 339.431 245.1 339.605C245.901 339.866 246.71 340.107 247.528 340.326C248.346 340.545 249.167 340.742 249.99 340.915C250.791 341.177 251.6 341.417 252.418 341.636C253.236 341.855 254.056 342.052 254.88 342.226C255.68 342.487 256.489 342.727 257.307 342.946C258.125 343.165 258.946 343.362 259.77 343.536C260.57 343.797 261.38 344.038 262.198 344.257C263.016 344.476 263.836 344.672 264.66 344.846C265.46 345.107 266.269 345.348 267.087 345.567C267.905 345.786 268.726 345.982 269.549 346.156C269.838 346.251 270.129 346.342 270.42 346.431C265.855 338.504 262.106 329.425 259.236 319.429C255.629 312.644 252.658 304.875 250.394 296.266C243.063 268.378 243.425 232.418 253.432 195.071C263.439 157.725 281.106 126.401 301.399 105.915C309.214 98.0263 317.329 91.8212 325.484 87.4688C295.878 104.993 268.436 144.943 254.899 195.464C242.251 242.664 244.729 287.941 258.872 318.138C256.533 309.705 254.813 300.638 253.747 291.075C248.065 264.21 249.078 230.887 258.324 196.382C268.33 159.036 285.997 127.712 306.29 107.226C308.032 105.467 309.79 103.792 311.559 102.202C322.834 89.5644 335.001 79.7661 347.407 73.4635C346.743 73.2533 346.072 73.0574 345.395 72.876C344.577 72.6568 343.756 72.4605 342.932 72.2866C342.132 72.0253 341.323 71.7849 340.505 71.5658C339.687 71.3466 338.867 71.1503 338.043 70.9764C337.243 70.7153 336.434 70.475 335.616 70.2558C334.798 70.0366 333.977 69.8402 333.153 69.6662C332.353 69.4049 331.543 69.1645 330.725 68.9452C329.907 68.7261 329.086 68.5298 328.263 68.3559C327.463 68.0947 326.654 67.8544 325.836 67.6353C325.018 67.4161 324.197 67.2198 323.374 67.0458ZM320.556 86.1799C290.964 103.716 263.539 143.653 250.007 194.154C236.476 244.654 240.258 292.953 257.118 322.936C252.242 315.097 248.324 305.678 245.506 294.956C238.174 267.068 238.537 231.108 248.544 193.761C258.55 156.415 276.217 125.091 296.51 104.605C304.312 96.7291 312.414 90.5313 320.556 86.1799ZM291.62 103.295C299.429 95.4124 307.537 89.2109 315.686 84.8591C286.087 102.389 258.653 142.333 245.119 192.844C231.584 243.355 235.371 291.664 252.239 321.645C247.358 313.802 243.437 304.377 240.616 293.646C233.284 265.758 233.647 229.798 243.654 192.451C253.66 155.105 271.327 123.781 291.62 103.295ZM310.796 83.5488C302.647 87.9007 294.539 94.1022 286.73 101.985C266.437 122.47 248.77 153.795 238.764 191.141C228.757 228.487 228.394 264.448 235.726 292.336C238.547 303.066 242.468 312.491 247.349 320.334C230.481 290.353 226.694 242.044 240.229 191.533C253.763 141.023 281.197 101.079 310.796 83.5488ZM281.84 100.674C289.649 92.7919 297.757 86.5904 305.906 82.2385C276.307 99.7687 248.873 139.712 235.339 190.223C221.804 240.734 225.591 289.043 242.459 319.024C237.578 311.181 233.657 301.756 230.836 291.025C223.504 263.138 223.867 227.177 233.874 189.831C243.88 152.484 261.547 121.16 281.84 100.674ZM301.016 80.9283C292.867 85.2802 284.758 91.4816 276.95 99.3642C256.657 119.85 238.99 151.174 228.984 188.52C218.977 225.867 218.614 261.827 225.946 289.715C228.767 300.446 232.688 309.871 237.569 317.714C220.701 287.733 216.914 239.424 230.449 188.913C243.983 138.402 271.417 98.4586 301.016 80.9283ZM272.061 98.0543C279.863 90.1782 287.965 83.9804 296.107 79.629C266.515 97.165 239.09 137.102 225.559 187.603C212.027 238.103 215.809 286.402 232.669 316.385C227.793 308.545 223.876 299.127 221.057 288.405C213.725 260.517 214.088 224.557 224.095 187.21C234.102 149.864 251.768 118.54 272.061 98.0543ZM291.255 78.2973C283.1 82.6497 274.985 88.8548 267.17 96.7436C246.877 117.229 229.21 148.553 219.204 185.9C209.197 223.246 208.834 259.207 216.166 287.095C218.989 297.834 222.914 307.265 227.801 315.112C210.924 285.132 207.133 236.814 220.67 186.293C234.207 135.772 261.649 95.822 291.255 78.2973ZM262.281 95.4337C270.083 87.5576 278.185 81.3599 286.327 77.0085C256.735 94.5445 229.31 134.482 215.778 184.982C202.247 235.482 206.029 283.782 222.889 313.764C218.013 305.925 214.096 296.507 211.277 285.785C203.945 257.897 204.308 221.936 214.315 184.59C224.322 147.244 241.988 115.919 262.281 95.4337ZM281.457 75.6877C251.858 93.218 224.424 133.161 210.89 183.672C197.355 234.183 201.142 282.492 218.011 312.473C213.13 304.63 209.208 295.205 206.387 284.474C199.055 256.587 199.418 220.626 209.425 183.28C219.432 145.933 237.098 114.609 257.391 94.1234C265.2 86.241 273.308 80.0396 281.457 75.6877ZM201.497 283.164C204.318 293.895 208.24 303.32 213.121 311.163C196.252 281.182 192.465 232.873 206 182.362C219.534 131.851 246.968 91.9075 276.567 74.3772C268.418 78.7291 260.31 84.9306 252.501 92.8132C232.208 113.299 214.542 144.623 204.535 181.969C194.528 219.316 194.165 255.276 201.497 283.164Z" fill="url(#paint2_linear_37_140)" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M97.4291 6.50399C98.2528 6.67792 99.0738 6.87432 99.8918 7.09351C100.71 7.3127 101.519 7.55306 102.319 7.81427C103.143 7.9882 103.964 8.1846 104.782 8.40378C147.991 19.9817 166.584 90.7046 146.31 166.368C126.036 242.031 74.5727 293.983 31.3635 282.405C30.5455 282.186 29.7363 281.945 28.9361 281.684C28.1124 281.51 27.2915 281.314 26.4735 281.094C25.6555 280.875 24.8463 280.635 24.0461 280.374C23.2224 280.2 22.4015 280.003 21.5835 279.784C20.7657 279.565 19.9567 279.325 19.1567 279.064C18.3333 278.89 17.5126 278.693 16.6948 278.474C15.8766 278.255 15.0672 278.015 14.2667 277.753C13.4428 277.579 12.6217 277.383 11.8034 277.164C10.9857 276.944 10.1767 276.704 9.37669 276.443C8.55327 276.269 7.73255 276.073 6.91478 275.854C6.09679 275.635 5.28762 275.394 4.48737 275.133C4.18966 275.07 3.8923 275.004 3.59531 274.936C11.5128 270.354 19.299 264.365 26.7818 257.143C33.2985 253.07 39.7563 247.828 46.0209 241.504C66.3141 221.019 83.9805 189.694 93.9875 152.348C103.994 115.002 104.357 79.0411 97.0253 51.1533C94.202 40.414 90.2764 30.9825 85.3898 23.1355C102.267 53.1152 106.058 101.434 92.5211 151.955C79.874 199.155 55.0898 237.127 27.7434 256.207C33.9848 250.073 40.0084 243.081 45.7131 235.332C64.0664 214.907 79.8505 185.543 89.0961 151.037C99.1031 113.691 99.4655 77.7304 92.134 49.8427C91.5045 47.4482 90.8202 45.1188 90.0827 42.8574C86.6369 26.2754 80.9994 11.7064 73.4064 0.0449972C74.0872 0.195354 74.7662 0.361121 75.4431 0.542502C76.2611 0.761689 77.0702 1.00205 77.8704 1.26326C78.6941 1.43719 79.5151 1.63359 80.3331 1.85278C81.1509 2.0719 81.9597 2.31218 82.7598 2.5733C83.5832 2.7472 84.404 2.94356 85.2218 3.16269C86.04 3.38194 86.8493 3.62236 87.6498 3.88365C88.4737 4.05762 89.2949 4.25408 90.1131 4.47332C90.9309 4.69245 91.7397 4.93273 92.5398 5.19385C93.3632 5.36774 94.184 5.56411 95.0018 5.78324C95.8198 6.00242 96.6289 6.24279 97.4291 6.50399ZM90.3022 24.4834C107.162 54.4659 110.944 102.765 97.4125 153.266C83.881 203.766 56.4555 243.704 26.8636 261.24C35.0057 256.888 43.1075 250.69 50.9096 242.814C71.2028 222.328 88.8692 191.004 98.8761 153.658C108.883 116.312 109.246 80.351 101.914 52.4632C99.0952 41.7412 95.1778 32.3228 90.3022 24.4834ZM106.804 53.7735C103.983 43.0428 100.061 33.6178 95.1803 25.7746C112.049 55.7557 115.835 104.065 102.301 154.576C88.7668 205.087 61.3328 245.03 31.7338 262.56C39.8826 258.208 47.9912 252.007 55.7996 244.124C76.0928 223.639 93.7592 192.315 103.766 154.968C113.773 117.622 114.136 81.6613 106.804 53.7735ZM100.07 27.0849C104.951 34.9281 108.873 44.3531 111.694 55.0838C119.026 82.9715 118.663 118.932 108.656 156.279C98.6492 193.625 80.9828 224.949 60.6896 245.435C52.8812 253.317 44.7727 259.519 36.6239 263.871C66.2229 246.34 93.6568 206.397 107.191 155.886C120.725 105.375 116.939 57.066 100.07 27.0849ZM116.584 56.3941C113.763 45.6633 109.841 36.2383 104.96 28.3951C121.829 58.3762 125.616 106.685 112.081 157.196C98.5468 207.707 71.1129 247.651 41.5139 265.181C49.6627 260.829 57.7712 254.628 65.5796 246.745C85.8728 226.259 103.539 194.935 113.546 157.589C123.553 120.242 123.916 84.2818 116.584 56.3941ZM109.85 29.7055C114.731 37.5487 118.653 46.9736 121.474 57.7043C128.806 85.5921 128.443 121.553 118.436 158.899C108.429 196.245 90.7628 227.57 70.4696 248.055C62.6612 255.938 54.5527 262.139 46.404 266.491C76.003 248.961 103.437 209.017 116.971 158.507C130.505 107.996 126.719 59.6866 109.85 29.7055ZM126.363 59.0142C123.544 48.2923 119.627 38.874 114.751 31.0346C131.61 61.0171 135.393 109.317 121.861 159.817C108.33 210.317 80.9043 250.254 51.3124 267.79C59.4545 263.439 67.5562 257.241 75.3583 249.365C95.6515 228.879 113.318 197.555 123.325 160.209C133.332 122.863 133.694 86.902 126.363 59.0142ZM119.619 32.3072C124.505 40.1542 128.431 49.5856 131.254 60.3249C138.586 88.2126 138.223 124.173 128.216 161.52C118.209 198.866 100.543 230.19 80.2496 250.676C72.435 258.565 64.3197 264.77 56.1644 269.122C85.7703 251.597 113.213 211.648 126.75 161.127C140.287 110.606 136.496 62.287 119.619 32.3072ZM136.143 61.6348C133.324 50.9129 129.407 41.4946 124.531 33.6552C141.39 63.6377 145.173 111.937 131.641 162.437C118.11 212.938 90.6842 252.875 61.0923 270.411C69.2344 266.06 77.3362 259.862 85.1383 251.986C105.432 231.5 123.098 200.176 133.105 162.83C143.112 125.483 143.474 89.5225 136.143 61.6348ZM129.409 34.9465C146.277 64.9276 150.064 113.237 136.53 163.747C122.996 214.258 95.5615 254.202 65.9625 271.732C74.1113 267.38 82.2199 261.179 90.0283 253.296C110.322 232.81 127.988 201.486 137.995 164.14C148.002 126.793 148.364 90.8328 141.033 62.9451C138.212 52.2145 134.29 42.7897 129.409 34.9465ZM94.9183 254.606C87.1099 262.489 79.0013 268.69 70.8525 273.042C100.452 255.512 127.886 215.568 141.42 165.058C154.954 114.547 151.167 66.2376 134.299 36.2564C139.18 44.0997 143.102 53.5246 145.923 64.2553C153.254 92.1431 152.892 128.104 142.885 165.45C132.878 202.796 115.212 234.121 94.9183 254.606Z" fill="url(#paint3_linear_37_140)" />
            <defs>
                <linearGradient id="paint0_linear_37_140" x1="175.332" y1="153.954" x2="207.44" y2="66.0354" gradientUnits="userSpaceOnUse">
                    <stop stop-color={strokecolor??default_strokecolor} />
                    <stop offset="1" stop-color={strokecolor??default_strokecolor} stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_37_140" x1="172.607" y1="198.376" x2="134.805" y2="301.888" gradientUnits="userSpaceOnUse">
                    <stop stop-color={strokecolor??default_strokecolor} />
                    <stop offset="1" stop-color={strokecolor??default_strokecolor} stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_37_140" x1="198.376" y1="174.813" x2="288.618" y2="207.768" gradientUnits="userSpaceOnUse">
                    <stop stop-color={strokecolor??default_strokecolor} />
                    <stop offset="1" stop-color={strokecolor??default_strokecolor} stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint3_linear_37_140" x1="151.796" y1="162.332" x2="55.4278" y2="145.446" gradientUnits="userSpaceOnUse">
                    <stop stop-color={strokecolor??default_strokecolor} />
                    <stop offset="1" stop-color={strokecolor??default_strokecolor} stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>


    );
}