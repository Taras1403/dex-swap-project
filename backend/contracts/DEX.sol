pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TokenA.sol";
import "./TokenB.sol";

contract DEX {
    // State variables
    IERC20 public immutable tokenA;
    IERC20 public immutable tokenB;

    // Liquidity pool (number of tokens in the contract)
    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalShares;
    mapping(address => uint256) public shares;

    // Event for exchange notification
    event Swap(address indexed sender, uint256 amountIn, uint256 amountOut, address tokenIn, address tokenOut);
    // Event to notify about adding liquidity
    event AddLiquidity(address indexed provider, uint256 amountA, uint256 amountB, uint256 liquidityShares);

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    // Function for adding liquidity
    function addLiquidity(uint256 _amountA, uint256 _amountB) public {
        // Transfer tokens from the user's wallet to the contract
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);

        uint256 liquidity;

        if (totalShares == 0) {
            // First liquidity
            liquidity = 1;
        } else {
            // Calculation of new liquidity ratios
            liquidity = (_amountA * totalShares) / reserveA;
        }

        shares[msg.sender] += liquidity;
        totalShares += liquidity;

        // Updating reserves
        reserveA += _amountA;
        reserveB += _amountB;

        emit AddLiquidity(msg.sender, _amountA, _amountB, liquidity);
    }

    // Function for token exchange (swap)
    function swap(address _tokenIn, uint256 _amountIn) public {
        require(_amountIn > 0, "amountIn must be greater than 0");

        address tokenOut = (_tokenIn == address(tokenA)) ? address(tokenB) : address(tokenA);
        
        IERC20 tokenInContract = IERC20(_tokenIn);
        IERC20 tokenOutContract = IERC20(tokenOut);
        
        uint256 reserveIn = (_tokenIn == address(tokenA)) ? reserveA : reserveB;
        uint256 reserveOut = (_tokenIn == address(tokenA)) ? reserveB : reserveA;
        
        require(tokenInContract.transferFrom(msg.sender, address(this), _amountIn), "Transfer failed");

        uint256 amountOut = getAmountOut(_amountIn, reserveIn, reserveOut);
        
        require(tokenOutContract.transfer(msg.sender, amountOut), "Transfer failed");

        // Updating reserves
        if (_tokenIn == address(tokenA)) {
            reserveA += _amountIn;
            reserveB -= amountOut;
        } else {
            reserveB += _amountIn;
            reserveA -= amountOut;
        }

        emit Swap(msg.sender, _amountIn, amountOut, _tokenIn, tokenOut);
    }

    // Auxiliary function for calculating the number of tokens for exchange
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
        uint256 amountInWithFee = amountIn * 997; // 0.3% комісія
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;
        return numerator / denominator;
    }
}